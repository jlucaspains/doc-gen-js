module Core.Web {
    export class JbsModal {
        //VARIABLES
        private defaultMessage : string;

        private id: string;
        private title: string;
        private width: string;
        private method: string;
        private autoClose: boolean;


        constructor(id: string, title: string, width: string, autoClose: boolean) {

            this.verifityContainer();

            //DEFAULT VALUES
            if (id == null) id = "jbsModal";
            if (autoClose === undefined || autoClose === null)
                autoClose = true;

            this.id = id;
            this.title = title;
            this.width = width;
            this.autoClose = autoClose;
        }

        private verifityContainer() {
            if ($("#divJbsElementsContainer").length === 0)
                $("body").append("<div id='divJbsElementsContainer'></div>");
        }

        open(html: string, buttons: string) {
            this.openModal(this, html);

            //WE APPEND BOTTONS, IF EXISTS
            if (buttons !== "" || buttons !== null) {
                $(`#${this.id}`).find(".modal-footer").prepend(buttons);
            }
        };

        load(url: string, message: string, method: string, callback: any = null) {
            //AFTER LOAD THE MODAL, WE NEED HAVE SURE THAT DOESN'T EXIST A MODAL WITH THE SAME ID
            if ($(`#${this.id}`).length > 0) {
                $("#divJbsElementsContainer").append(`<div class='divJbsOverlay' overlayFor='${this.id}' style='z-index: ${parseInt($(`#${this.id}`).css("z-index")) - 1}'></div>`);
                ($(`#${this.id}`) as any).modal("show");
                //CALLBACK
                if (callback !== null && callback !== undefined) { callback(); }
                //END
                return;
            }

            //DEFAULT VALUES
            if (message == null) message = "Loading page, wait...";
            if (method == null) method = "GET";

            const modalRequest = new JbsSubmitter(url, method, null, message, null, null);
            $.when(modalRequest.request()).then(response => {
                this.openModal(this, response, callback);
            });
        };

        private openModal(config: any, modalContent: any, callback: any = null): void {
            //CALCULAMOS O ZINDEX DOS ELEMENTOS
            const numberOfElements = $(".jbsElement").length;
            const zindex = 2000 + (2 * numberOfElements);

            $("#divJbsElementsContainer").append(`<div class='divJbsOverlay' overlayFor='${config.id}' style='z-index: ${zindex + 1}'></div>`);

            var htmlModal = ` <div class='modal jbsModal jbsElement' id='${config.id}' tabindex='-1' data-autoclose='${config.autoClose}' role='dialog' aria-labelledby='${config.id}' aria-hidden='true' style='z-index: ${(zindex + 2)}'>
                                <div class='modal-dialog' style='width:${config.width}px'>
                                    <div class='modal-content'>
                                        <div class='modal-header'>
                                            <button type='button' class='close btnJbsModalClose' jbsModalId='${config.id}' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button>
                                            <h4 class='modal-title'>${config.title}</h4>
                                        </div>
                                        <div class='modal-body'>${modalContent}</div>
                                        <div class='modal-footer'>
                                            <button type='button' data-dismiss='modal' class='btn btn-default btnJbsModalClose' jbsModalId='${config.id}'>Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>`;


            //APPEND MODAL ON HTML
            $("body").append(htmlModal);

            //WE APPEND BOTTONS, IF EXISTS
            $(`#${config.id}`).find(".modal-footer").prepend($(`#${config.id}`).find(".divJbsModalButtons").html());
            $(`#${config.id}`).find(".divJbsModalButtons").remove();

            //$.validator.unobtrusive.parse(document);

            //OPEN MODAL
            ($(`#${config.id}`) as any).modal({ keyboard: false, backdrop: false });

            //CALLBACK
            if (callback !== null && callback !== undefined) { callback(); }
        }

        close(): void {
            jbsModalClose(this.id);
        }
    }
}

$(document).on("click", ".btnJbsModalClose", function () { jbsModalClose($(this).attr("jbsModalId")); });

function jbsModalClose(jbsModalId: string): void {

    $(`.divJbsOverlay[overlayFor='${jbsModalId}']`).remove();

    //AUTOCLOSE OFF
    const element: any = $(`#${jbsModalId}`)[0];
    if (element.dataset.autoclose === "false") {
        ($(`#${jbsModalId}`) as any).modal("hide");
        return;
    }

    $(`#${jbsModalId}`).remove();

    //WHEN WE CLOSE THE MODAL, BUT STILL ONE MORE WE ADD DE CLASS 'modal-open' ON BODY
    if ($(".modal.in").length > 0) {
        $("body").addClass("modal-open");
    } else {
        $("body").removeClass("modal-open");
        $("body").css("padding-right", "0");
    }
}

$(document).on("click", "[data-modal='true']", function (e) {
    e.preventDefault();
    const modalButton = new Core.Web.JbsModal(this.dataset.modalid, this.dataset.modaltitle, this.dataset.modalwidth, this.dataset.modalautoclose);
    modalButton.load(this.dataset.modalurl, null, this.dataset.modalmethod);
});
