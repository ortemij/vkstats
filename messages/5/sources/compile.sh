#!/bin/bash

if [ -n "$1" ]; then
  VERSION="$1"
  SUFFIX="-$VERSION"
  svn up ../../..
  if [ -e ../builds/message-stats-core$SUFFIX.js ]; then
    echo "Version $VERSION already exists!"
    echo "Press any key to continue or Ctrl+C for break"
    read
  fi
else
  VERSION=""
  SUFFIX=""
fi

cat auxiliary.js > ../bookmarklet/message-stats-core-src.js
echo >> ../bookmarklet/message-stats-core-src.js

cat sys.js >> ../bookmarklet/message-stats-core-src.js
echo >> ../bookmarklet/message-stats-core-src.js

cat ui.js >> ../bookmarklet/message-stats-core-src.js
echo >> ../bookmarklet/message-stats-core-src.js

cat stat-counter.js >> ../bookmarklet/message-stats-core-src.js
echo >> ../bookmarklet/message-stats-core-src.js

cat message-processor.js >> ../bookmarklet/message-stats-core-src.js
echo >> ../bookmarklet/message-stats-core-src.js

cat api-connector.js >> ../bookmarklet/message-stats-core-src.js
echo >> ../bookmarklet/message-stats-core-src.js

if [ -n "$VERSION" ]; then
  echo >> ../bookmarklet/message-stats-core-src.js
  echo "SYS.VERSION='$VERSION';" >> ../bookmarklet/message-stats-core-src.js
  echo >> ../bookmarklet/message-stats-core-src.js
fi

cat start.js >> ../bookmarklet/message-stats-core-src.js
echo >> ../bookmarklet/message-stats-core-src.js

native2ascii -encoding windows-1251 ../bookmarklet/message-stats-core-src.js ../bookmarklet/message-stats-core-ascii.js
java -jar ../../../compiler.jar --js ../bookmarklet/message-stats-core-ascii.js --js_output_file ../bookmarklet/message-stats-core.js --compilation_level SIMPLE_OPTIMIZATIONS

if [ -n "$VERSION" ]; then
  cp ../bookmarklet/message-stats-core.js ../builds/message-stats-core$SUFFIX.js
fi

rm ../bookmarklet/message-stats-core-src.js
rm ../bookmarklet/message-stats-core-ascii.js

if [ -n "$VERSION" ]; then
  svn add ../builds/message-stats-core$SUFFIX.js
  svn commit ../builds/message-stats-core$SUFFIX.js ../bookmarklet/message-stats-core.js -m "$VERSION: $2"
fi
