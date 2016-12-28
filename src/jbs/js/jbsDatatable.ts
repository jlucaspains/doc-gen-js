// module Core.Web {

//     export class JbsDatatable {

//         static tableToggleColumns: DataTables.DataTable = null;
//         static tableToggleFilters: any = null;

//         static create(table: JQuery, configurations: DataTables.Settings, autorefresh: number = 0): DataTables.DataTable {
//             const scope = this;
//             const buttons: DataTables.ButtonSettings[] = [];


//             //CREATE DOM OF TABLE
//             const dom = `   <'row'
//                                 <'hidden-xs hidden-sm col-md-6'l>
//                                 <'col-xs-12 hidden-sm col-md-6'f>
//                             >
//                             <tr>
//                             <'row'
//                                 <'hidden-xs hidden-sm col-md-4'i>
//                                 <'col-xs-12 hidden-sm col-md-8'pB>
//                             >`;

//             configurations.dom = dom;

//             //VERIFY DEVICE WIDTH
//             let pagingType = "simple_numbers";
//             if ($(window).width() <= 768) { pagingType = "simple"; }
//             configurations.pagingType = pagingType;

//             //IF THE DATATABLE HAS AUTOREFRESH WE NEED MAKE SOME CHANGES
//             const buttonRefresh: DataTables.ButtonSettings = {
//                 text: "<i title='Refresh' class='glyphicon glyphicon-refresh'></i>",
//                 name: "btn-autorefresh",
//                 action(e : any, dt: DataTables.DataTable) {
//                     if (configurations.ajax === undefined) return;
//                     if (!configurations.processing) {
//                         JbsWait.show("Reloading table, wait...");
//                     }
//                     dt.ajax.reload(() => { if (!configurations.processing) { JbsWait.stop(); } }, true);
//                 }
//             };
//             if (!autorefresh) {
//                 if (table[0] !== undefined && table[0].dataset["autorefresh"] !== undefined)
//                     autorefresh = Number(table[0].dataset["autorefresh"]);
//             }
//             if (autorefresh) {
//                 configurations.stateSave = true;
//                 buttonRefresh.className = "active btnDtAutorefresh";
//                 buttonRefresh.text = "<i class='glyphicon glyphicon-refresh'></i>";
//             }


//             //INCLUDE EXPORT BUTTONS
//             if (configurations.searching || configurations.searching == undefined) {
//                 if (!configurations.processing) {
//                     buttons.push({
//                         text: "<i title='Filter Columns' class='glyphicon glyphicon-filter'></i>",
//                         action(e, dt) {
//                             scope.toggleFiltersVisible(dt);
//                         }
//                     });
//                 }
//             }
//             buttons.push({
//                 text: "<i title='Show / hide columns' class='glyphicon glyphicon-cog'></i>",
//                 action(e, dt) {
//                     scope.toggleColumnsVisible(dt);
//                 }
//             });
//             if (configurations.ajax !== undefined) { buttons.push(buttonRefresh); }
//             buttons.push({ extend: "excel", className: "excelButton", text: "<i title='Download' class='glyphicon glyphicon-save-file'></i>" });
//             buttons.push({ extend: "copy", className: "copyButton", text: "<i title='Copy' class='glyphicon glyphicon-duplicate'></i>" });
//             configurations.buttons = buttons;



//             const dataTable = table.DataTable(configurations);
//             if ((configurations.paging === false || configurations.lengthChange === false) &&
//                 configurations.searching === false) {
//                 table.closest(".table-container").addClass("withoutFirstRow");
//             }

//             //IF THE DATATABLE HAS AUTOREFRESH WE NEED MAKE SOME CHANGES
//             if (autorefresh) {
//                 JbsDatatable.autorefresh(autorefresh, dataTable);
//                 $(".btnDtAutorefresh").tooltip({
//                     title: `auto refresh every ${(autorefresh / 1000)} seconds`,
//                     trigger: "hover",
//                     container: "body"

//                 });
//             }

//             //IF STATE SAVE IS TRUE WE NEED REMOVE COLUMN FILTER
//             if (configurations.stateSave)
//                 dataTable
//                     .columns()
//                     .search("")
//                     .draw();

//             return dataTable;
//         }

//         private static toggleFiltersVisible(dTable: any) {

//             //FIRST OF ALL WE NEED HAVE SURE THAT THERE'S NO OTHER TABLE FILTERING
//             if (this.tableToggleFilters !== null) {
//                 if (this.tableToggleFilters.settings()[0].sTableId !== dTable.settings()[0].sTableId) {
//                     this.tableToggleFilters
//                         .columns()
//                         .search("")
//                         .draw();
//                 }
//             }

//             this.tableToggleFilters = dTable;

//             const scope = this;
//             const settings = dTable.settings();
//             const header: Array<any> = settings[0].aoHeader[0];
//             const tableDom = $(`#${settings[0].sTableId}`);

//             //FIST WE VERIFIY IF THE TABLE HAS TFOOT ELEMENT
//             if (tableDom.find("tfoot tr.filters").length === 0) {
//                 let tds = "";
//                 let position = 0;
//                 for (let column of header) {
//                     if (column.cell.innerText !== "" && column.cell.clientWidth > 0) {
//                         tds += `<td><input data-columnposition=${position} style="width: ${(column.cell.clientWidth - 16
//                         )}px" type="search" placeholder="Search in ${column.cell.innerText
//                             }" class="form-control dtTxtFooterFilter"></td>`;
//                     } else {
//                         if (column.cell.clientWidth > 0) {
//                             tds += `<td>&nbsp</td>`;
//                         } else {
//                             tds += `<td style="display: none;">&nbsp</td>`;
//                         }

//                     }
//                     position++;
//                 }
//                 tableDom.append(`<tfoot><tr class="filters">${tds}</tr></tfoot>`);
//                 tableDom.find(".dtTxtFooterFilter")
//                     .on("keyup",
//                     (obj: any) => {
//                         scope.tableToggleFilters
//                             .column(obj.currentTarget.dataset.columnposition)
//                             .search(obj.currentTarget.value)
//                             .draw();
//                     });
//             } else {
//                 if (tableDom.find("tfoot tr.filters").is(":visible")) {
//                     this.tableToggleFilters
//                         .columns()
//                         .search("")
//                         .draw();
//                 }
//                 tableDom.find("tfoot tr.filters input").val("");
//                 tableDom.find("tfoot tr.filters").toggle();
//             }
//         }

//         private static toggleColumnsVisible(dTable: DataTables.DataTable) {
//             //IF THE FILTER IS ACTIVE WE NEED CLOSE IT FIRST
//             if (this.tableToggleFilters) {
//                 this.tableToggleFilters
//                     .columns()
//                     .search("")
//                     .draw();

//                 $(`#${this.tableToggleFilters.settings()[0].sTableId}`).find("tfoot tr.filters").remove();
//             }

//             this.tableToggleColumns = dTable;
//             const settings: any = dTable.settings();
//             const header: Array<any> = settings[0].aoHeader[0];

//             let columnsLi = "";
//             let position = 0;

//             for (let column of header) {
//                 const checked = column.cell.clientWidth === 0 ? "" : "checked";
//                 columnsLi += `  <li class='list-group-item'>
//                                     <input type="checkbox" ${checked} class="switch-control" data-on-text="Show" data-off-text="Hide" data-column-position="${position}" />                                    
//                                     ${(column.cell.innerText === "" ? "Empty" : column.cell.innerText)}
//                                 </li>`;
//                 position += 1;
//             }
//             const modalContent = `  <div id="divToggleColumnsVisible">
//                                         <ul class="list-group">
//                                             ${columnsLi}
//                                         </ul>
//                                     </div>`;
//             const columnsModal = new JbsModal("toggleColumnsModal", "Show / hide columns", "400", true);
//             columnsModal.open(modalContent, null);


//             const toggleButtonCollection = $("#divToggleColumnsVisible .switch-control");
//             toggleButtonCollection.bootstrapSwitch({
//                 onSwitchChange: (event: any, state: boolean) => {
//                     var column = JbsDatatable.tableToggleColumns.column(event.target.dataset.columnPosition);
//                     column.visible(state);
//                     this.disableToggleButtons();
//                 }
//             });

//             this.disableToggleButtons();

//         }

//         private static disableToggleButtons() {
//             const toggleButtonCollection = $("#divToggleColumnsVisible .switch-control");

//             //MUST HAVE AT LEAST ONE COLUMN VISIBLE
//             const buttonsVisibleCount = ((toggleButtonCollection.length + 1) -
//                 $("#divToggleColumnsVisible .switch-control:checked").length);
//             if (((toggleButtonCollection.length + 1) - buttonsVisibleCount) === 1) {
//                 $("#divToggleColumnsVisible .switch-control:checked").bootstrapSwitch("disabled", true);
//             } else {
//                 toggleButtonCollection.bootstrapSwitch("disabled", false);
//             }
//         }

//         private static autorefresh(timeout: number, dTable: DataTables.DataTable): void {
//             setTimeout(() => {
//                 dTable.ajax.reload(null, false);
//                 this.autorefresh(timeout, dTable);
//             }, timeout);
//         }
//     }

// }