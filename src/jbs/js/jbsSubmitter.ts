module Core.Web {
    export class JbsSubmitter {
        //VARIABLES
        method : string;
        url : string;
        parameters : string;
        message : string;
        contentType : string;
        jbsModal : JQuery;

        constructor(url: string, method: string, parameters: string, message: string, contentType: string, jbsModal: JQuery) {
            //DEFAULT VALUES
            if (method == null) method = "GET";
            if (contentType == null) contentType = "application/x-www-form-urlencoded; charset=UTF-8";

            this.method = method;
            this.url = url;
            this.parameters = parameters;
            this.message = message;
            this.contentType = contentType;
            this.jbsModal = jbsModal;
        }

        request() {
            const thisRequest = this;

            if (thisRequest.jbsModal != null) { thisRequest.jbsModal.hide(); }
            if (this.message !== null && this.message !== "") {
                JbsWait.show(this.message);
            }

            return $.ajax({
                type: this.method,
                url: this.url,
                cache: false,
                data: this.parameters,
                contentType: this.contentType,
                success(data) {
                    if (thisRequest.message !== undefined && thisRequest.message !== null && thisRequest.message !== "") {
                        JbsWait.stop();
                    }
                    if (thisRequest.jbsModal != null) { thisRequest.jbsModal.show(); }

                },
                error(req, status, error) {
                    JbsWait.stop();
                    if (thisRequest.jbsModal != null) { thisRequest.jbsModal.show(); }
                }
            });
        }
    }
}