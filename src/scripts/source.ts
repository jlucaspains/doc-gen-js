module DocGen {
    import JbsModal = Core.Web.JbsModal;
    export class Source {

        private changeSourceUrlModal: JbsModal;
        public sourceUrl: string = '';

        constructor() {
            this.sourceUrl = 'https://raw.githubusercontent.com/jlucaspains/doc-gen-js/master/example.json';
            this.changeSourceUrlModal = new JbsModal("changeSourceUrlModal", "Change Source Url", "500", true);
            this.bindingsElementsFromDom();
        }

        private bindingsElementsFromDom(): void {
            $(document).on("click", "#btn-changeSourceUrl-save", () => { this.saveSourceUrl(); });
        }

        public openModal(): void {
            const html = `  <form id="frmChangeSourceUrl">
                                <div class="row">
                                    <div class="form-group col-md-12">
                                        <label>Url</label>
                                        <input id="txtSouceUrl" class="form-control" type="text" value="${this.sourceUrl}">
                                    </div>
                                </div>
                            </form>`;
            const buttons = `<button id="btn-changeSourceUrl-save" class="btn btn-primary" type="button"><span class="glyphicon glyphicon-save"></span> Save</button>`;
            this.changeSourceUrlModal.open(html, buttons);
        }

        private saveSourceUrl(): void{
            this.sourceUrl = $("#frmChangeSourceUrl #txtSouceUrl").val();
            this.changeSourceUrlModal.close();
        }
    }
}