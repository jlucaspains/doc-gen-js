module DocGen {
    import JbsModal = Core.Web.JbsModal;
    import JbsSubmitter = Core.Web.JbsSubmitter;

    export class Preview {

        private previewModal: JbsModal;

        constructor(private editor: any, private sandbox: boolean) {
            this.previewModal = new JbsModal("previewModal", "Preview", "900", true);
        }

        public open(sourceUrl: string): void {

            const formSubmitter = new JbsSubmitter(sourceUrl, "GET", null, "Load data, please wait...", null, null);
            $.when(formSubmitter.request()).then(response => {
                const html = Mustache.to_html(this.editor.getContent(), JSON.parse(response));
                this.previewModal.open(html, null);

            }).fail(error => {
                console.error(error);
            });
        }
    }
}