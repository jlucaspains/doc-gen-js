module Core.Web {
    export class JbsWait {

        private static verifityContainer() {
            if ($("#divJbsElementsContainer").length === 0)
                $("body").append("<div id='divJbsElementsContainer'></div>");
        }


        static show(message: string) {
            //FIRST WE VERIFIFY THE CONTAINER
            this.verifityContainer();

            //CALCULAMOS O ZINDEX DOS ELEMENTOS
            const numberOfElements = $(".jbsElement").length;
            const zindex = 2000 + (2 * numberOfElements);

            //INSERIMOS NO HTML
            $("#divJbsElementsContainer").append(`<div class='divJbsOverlay' overlayFor='jbsWait' style='z-index: ${zindex + 1}'></div>`);
            $("body").append(`<div class='jbsElement jbsWait' style='z-index: ${zindex + 2}'><h2>${message}</h2></div>`);

            //TRATAMOS A LARGURA
            let divWait: JQuery;
            if (numberOfElements === 0) { divWait = $(".jbsWait"); }
            else { divWait = $(".jbsWait:last"); }
            divWait.css("margin-left", ((divWait.width() + 60) / 2) * -1);
        }
        
        static stop() {
            $(".jbsWait:last").remove();
            $(".divJbsOverlay[overlayFor='jbsWait']:last").remove();
        }

    }
}



$(() => {
    $("form[data-waitform='true']").submit(function() {
        const validator = $(this).validate();
        let message = "Submiting form, wait...";
        if (this.dataset.waitformmessage != null && this.dataset.waitformmessage !== "") {
            message = this.dataset.waitformmessage;
        }
        if (validator.form()) {
            Core.Web.JbsWait.show(message);
            return true;
        } else {
            return false;
        }
    });
});