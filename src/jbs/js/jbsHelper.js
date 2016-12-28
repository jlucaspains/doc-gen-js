var Core;
(function (Core) {
    var Web;
    (function (Web) {
        var JbsHelper = (function () {
            function JbsHelper() {
            }
            /*############################################################*/
            JbsHelper.convertDateTime = function (date) {
                if (!date)
                    return null;
                var parsedDate = new Date(parseInt(date.match(/\d+/)[0]));
                return parsedDate.toLocaleDateString() + " " + parsedDate.toLocaleTimeString();
            };
            JbsHelper.convertDate = function (date) {
                if (!date)
                    return null;
                var parsedDate = new Date(parseInt(date.match(/\d+/)[0]));
                return parsedDate.toLocaleDateString();
            };
            JbsHelper.aceFormatValueXml = function (xml) {
                var reg = /(>)\s*(<)(\/*)/g;
                var wsexp = / *(.*) +\n/g;
                var contexp = /(<.+>)(.+\n)/g;
                xml = xml.replace(reg, "$1\n$2$3").replace(wsexp, "$1\n").replace(contexp, "$1\n$2");
                var formatted = "";
                var lines = xml.split("\n");
                var indent = 0;
                var lastType = 'other';
                // 4 types of tags - single, closing, opening, other (text, doctype, comment) - 4*4 = 16 transitions 
                var transitions = {
                    'single->single': 0,
                    'single->closing': -1,
                    'single->opening': 0,
                    'single->other': 0,
                    'closing->single': 0,
                    'closing->closing': -1,
                    'closing->opening': 0,
                    'closing->other': 0,
                    'opening->single': 1,
                    'opening->closing': 0,
                    'opening->opening': 1,
                    'opening->other': 1,
                    'other->single': 0,
                    'other->closing': -1,
                    'other->opening': 0,
                    'other->other': 0
                };
                for (var i = 0; i < lines.length; i++) {
                    var ln = lines[i];
                    var single = Boolean(ln.match(/<.+\/>/)); // is this line a single tag? ex. <br />
                    var closing = Boolean(ln.match(/<\/.+>/)); // is this a closing tag? ex. </a>
                    var opening = Boolean(ln.match(/<[^!?].*>/)); // is this even a tag (that's not <!something>)
                    var type = single ? "single" : closing ? "closing" : opening ? "opening" : "other";
                    var fromTo = lastType + "->" + type;
                    lastType = type;
                    var padding = "";
                    indent += transitions[fromTo];
                    for (var j = 0; j < indent; j++) {
                        padding += "\t";
                    }
                    if (fromTo === "opening->closing")
                        formatted = formatted.substr(0, formatted.length - 1) + ln + "\n"; // substr removes line break (\n) from prev loop
                    else
                        formatted += padding + ln + "\n";
                }
                return formatted;
            };
            return JbsHelper;
        }());
        Web.JbsHelper = JbsHelper;
        var LiteEvent = (function () {
            function LiteEvent() {
                this.handlers = [];
            }
            LiteEvent.prototype.on = function (handler) {
                this.handlers.push(handler);
            };
            LiteEvent.prototype.off = function (handler) {
                this.handlers = this.handlers.filter(function (h) { return h !== handler; });
            };
            LiteEvent.prototype.trigger = function (data) {
                this.handlers.slice(0).forEach(function (h) { return h(data); });
            };
            return LiteEvent;
        }());
        Web.LiteEvent = LiteEvent;
        /*############################################################*/
    })(Web = Core.Web || (Core.Web = {}));
})(Core || (Core = {}));
//# sourceMappingURL=jbsHelper.js.map