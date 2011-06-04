#!/bin/bash

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

cat start.js >> ../bookmarklet/message-stats-core-src.js
echo >> ../bookmarklet/message-stats-core-src.js

native2ascii -encoding windows-1251 ../bookmarklet/message-stats-core-src.js ../bookmarklet/message-stats-core-ascii.js
java -jar ../../../compiler.jar --js ../bookmarklet/message-stats-core-ascii.js --js_output_file ../bookmarklet/message-stats-core.js --compilation_level SIMPLE_OPTIMIZATIONS

rm ../bookmarklet/message-stats-core-src.js
rm ../bookmarklet/message-stats-core-ascii.js
