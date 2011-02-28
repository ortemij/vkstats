var SYS = {
	VERSION: '4.2.1',
	APP_ID: 2045168,
	LOGIN_SETTING: 0 + 2048 + 4096,
	DEBUG: false,
	MESSAGES_TO_PROCESS_IN_DEBUG_MODE: 400,
	MESSAGES_PER_REQUEST: 100,
	MSEC_BETWEEN_REQUESTS: 333,
	MSEC_BETWEEN_REQUESTS_FOR_USERDATA: 1000,
	MAX_USERS_PER_REQUEST: 1000,
	LINK_TO_CLUB: '/club21792535',
	TOO_MANY_REQUESTS_ERR_CODE: 6,
	MAX_USERS_AT_ONE_GRAPH: 3,
	CSS_FILES_TO_LOAD: ['http://vk.com/css/mail2.css', 'http://vk.com/css/dialog2.css', 'http://vk.com/css/pages.css', 'http://vk.com/css/ui_controls.css'],
	JS_FILES_TO_LOAD: ['http://vk.com/js/lib/swfobject2.js', 'http://vk.com/js/mail.js', 'http://vk.com/js/lib/ui_controls.js'/*, 'http://vk.com/js/common.js'*/],
	LANGUAGES: {
		0: {
			name: 'russian',
			strings: {
				authorizing: 'Авторизация',
				authorized: 'Авторизация завершена',
				loadingMessageNumbers: 'Определение числа сообщений',
				fatal: 'Критическая ошибка. Пожалуйста, сообщите приведённые ниже данные разработчику.',
				appName: 'Статистика личной переписки',
				nameCol: 'Имя',
				kbytes: 'Учитывать размер сообщений',
				settingsText: 'Выберите желаемые параметры',
				startButton: 'Поехали!',
				verbose: 'Логгировать все действия',
				gettingNames: 'Загрузка имён пользователей',
				numberOfMessagesCol: 'Всего сообщений',
				sentCol: 'Отправлено',
				receivedCol: 'Получено',
				symbolsCol: 'Всего символов',
				sentSymbolsCol: 'Отправлено символов',
				receivedSymbolsCol: 'Получено символов',
				lastMsgCol: 'Последнее сообщение',
				processingMessages: 'Обработка сообщений',
				done: 'Обработка завершена',
				messagesProcessed: 'Обработано сообщений',
				incoming: 'входящих',
				outgoing: 'исходящих',
				dayWithMostMessages: 'Больше всего сообщений было',
				timeWithMostMessages: 'Больше всего сообщений',
				thankYou: 'Спасибо, что дождались, надеемся, оно того стоило!',
				exportByTime: 'Экспорт статистики по времени',
				exportByMessages: 'Экспорт статистики по сообщениям',
				warning: 'Внимание! Не удалось обработать сообщений',
				friendsOnly: 'Учитывать только друзей',
				withSelected: 'Выбранные',
				exportToNote: 'экспортировать в заметку',
				ourGroup: 'Наша группа',
				noteSuccess: 'Заметка успешно создана',
				noteFailure: 'Не удалось создать заметку. Попробуйте ещё раз позднее.',
				seeNote: 'Посмотреть',
				plotKbytesGraph: 'построить график по числу символов',
				plotMessagesGraph: 'построить график по числу сообщений',
				wantToPlotGraphs: 'Я захочу строить графики общения от времени',
				totalFirstName: 'Общая', 
				totalLastName: 'статистика',
				sortByKBytes: 'Сортировать по килобайтам'
			}
		},
		1: {
			name: 'ukrainian',
			strings: {
				authorizing: 'Авторизація',
				authorized: 'Авторизація завершена',
				loadingMessageNumbers: 'Визначення кількості повідомлень',
				settingsText: 'Виберіть бажані параметри',
				startButton: 'Поїхали!',
				verbose: 'Логгіровать всі дії',
				fatal: 'Критична помилка. Будь ласка, повідомте наведені нижче дані розробнику.',
				appName: 'Статистика приватні переписки',
				nameCol: "Ім'я",
				numberOfMessagesCol: 'Усього повідомлень',
				kbytes: 'Враховувати розмір повідомлень',
				gettingNames: 'Завантаження імен користувачів',
				symbolsCol: 'Всього символів',
				sentSymbolsCol: 'Ви відправили символів',
				receivedSymbolsCol: 'Ви отримали символів',
				sentCol: 'Ви відправили',
				receivedCol: 'Ви одержали',
				lastMsgCol: 'Останнє повідомлення',
				messagesProcessed: 'Оброблене повідомлень',
				processingMessages: 'Обробка повідомлень',
				done: 'Обробка завершена',
				incoming: 'входять',
				outgoing: 'вихідних',
				dayWithMostMessages: 'Найбільше повідомлень було',
				timeWithMostMessages: 'Найбільше повідомлень',
				thankYou: 'Спасибі, що дочекалися, сподіваємося, воно того коштувало!',
				exportByTime: 'Експорт статистики за часом',
				exportByMessages: 'Експорт статистики за повідомленням',
				warning: 'Увага! Не вдалося обробити повідомлень',
				friendsOnly: 'Враховувати тільки друзів',
				withSelected: 'Вибрані',
				exportToNote: 'експортувати в замітку',
				ourGroup: 'Наша група',
				noteSuccess: 'Замітка успішно створена',
				noteFailure: 'Не вдалося створити замітку. Спробуйте ще раз пізніше.',
				seeNote: 'Подивитися',
				plotKbytesGraph: 'побудувати графік за кількістю символів',
				plotMessagesGraph: 'побудувати графік за кількістю сообщенійь',
				wantToPlotGraphs: 'Я захочу будувати гарні графіки',
				totalFirstName: 'Загальна', 
				totalLastName: 'статистика',
				sortByKBytes: 'Cортувати по кілобайтам'
			}
		},
		3: {
			name: 'english',
			strings: {
				authorizing: 'Authorizing',
				authorized: 'Authorization complete',
				loadingMessageNumbers: 'Getting message numbers',
				fatal: 'Fatal error. Please, send the info below to the developers',
				appName: 'Private messages statistics',
				settingsText: 'Set your desired parameters',
				startButton: 'Start',
				verbose: 'Verbose mode',
				kbytes: 'Count message sizes as well',
				nameCol: 'Name',
				numberOfMessagesCol: 'Number of messages',
				gettingNames: 'Loading user names',
				sentCol: 'Sent',
				receivedCol: 'Received',
				symbolsCol: 'Total symbols',
				sentSymbolsCol: 'Sent symbols',
				receivedSymbolsCol: 'Received symbols',
				lastMsgCol: 'Last Message',
				messagesProcessed: 'Messages processed',
				processingMessages: 'Processing messages',
				done: 'Processing complete',
				incoming: 'incoming',
				outgoing: 'outgoing',
				dayWithMostMessages: 'Day with most messages',
				timeWithMostMessages: 'Time with most messages',
				thankYou: 'Thank you for your time, we hope it was worth it!',
				exportByTime: 'Export time statistics',
				exportByMessages: 'Export message statistics',
				warning: 'Warning! Failed to process messages',
				friendsOnly: 'Count only for friends',
				withSelected: 'Selected',
				exportToNote: 'export to note',
				ourGroup: 'Our club',
				noteSuccess: 'Note created successfully',
				noteFailure: 'Failed to create a note. Please try again later',
				seeNote: 'See it',
				plotKbytesGraph: 'plot symbol number graph',
				plotMessagesGraph: 'plot message number graph',
				wantToPlotGraphs: 'I\'d like to plot fancy graphs',
				totalFirstName: 'Overall', 
				totalLastName: 'stats',
				sortByKBytes: 'Sort by kilobytes'
			}
		}
	},
	
	fatal: function(obj) {
		ui.setHeader(user.lang.fatal);
		ui.clearContent();
		var t = ce('textarea', {'cols': 80, 'rows': 20}, {fontFamily: 'Courier new'});
		t.innerHTML = obj;
		ui.appendContentElement(t);
		throw obj;
	},
	
	log: function(str) {
		str = formatDate(new Date(), true) + ': ' + str;
		var pane = ge('loggerPane');
		if(pane == undefined || pane == null) {
			ui.addLoggerPane();
			pane = ge('loggerPane');
		}
		pane.innerHTML += str + "\n";
		pane.scrollTop = pane.scrollHeight;
	}
};

var user = {
	lang: SYS.LANGUAGES[langConfig.id] == undefined ? SYS.LANGUAGES[3].strings : SYS.LANGUAGES[langConfig.id].strings,
	verbose: false,
	kbytes: true,
	friendsOnly: false,
	plotGraphs: true,
	sortByKBytes: false
};