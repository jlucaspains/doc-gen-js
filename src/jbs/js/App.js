// module Core.Web {
//     export class App {
//         static setupBootstrapSwitch(): void {
//             $.fn.bootstrapSwitch.defaults.size = "small";
//             $(".switch-control").bootstrapSwitch();
//         }
//         static setToastrOptions(): void {
//             toastr.options.positionClass = "toast-top-right";
//             toastr.options.progressBar = true;
//             toastr.options.closeButton = true;
//             toastr.options.extendedTimeOut = 5000;
//             toastr.options.timeOut = 5000;
//         }
//         static displayMessage(type: string, message: string): void {
//             if (type && message) {
//                 switch (type) {
//                     case "info": toastr.info(message); break;
//                     case "success": toastr.success(message); break;
//                     case "error": toastr.error(message); break;
//                 }
//             }
//         }
//         static setupDataTables(): void {
//             $("table[data-role='datatable']").each((index, element) => {
//                 JbsDatatable.create($(element), {} as any);
//             });
//             $('a[data-toggle="tab"]').on("shown.bs.tab", e => {
//                 $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
//             });
//         }
//         static setupClientSecurity() {
//             let itemsWithoutAccess = $("[data-valid-mode='False']");
//             if (itemsWithoutAccess.length > 0) {
//                 itemsWithoutAccess.closest("li").tooltip({ placement: "bottom", trigger: "hover focus", title: "This action is not available in current dashboard mode.", container: "body" });
//                 itemsWithoutAccess.addClass("noPermission");
//                 itemsWithoutAccess.attr("id", "");
//                 itemsWithoutAccess.click(() => false);
//             } else {
//                 itemsWithoutAccess = $("[data-has-permission='False']");
//                 if (itemsWithoutAccess.length > 0) {
//                     itemsWithoutAccess.closest("li").tooltip({ placement: "bottom", trigger: "hover focus", title: "You don't have access to execute this action.", container: "body" });
//                     itemsWithoutAccess.addClass("noPermission");
//                     itemsWithoutAccess.attr("id", "");
//                     itemsWithoutAccess.click(() => false);
//                 }
//             }
//         }
//     }
// }
// $(document).ready(() => {
//     Core.Web.App.setupBootstrapSwitch();
//     Core.Web.App.setToastrOptions();
//     Core.Web.App.setupDataTables();
//     Core.Web.App.setupClientSecurity();
// }); 
//# sourceMappingURL=App.js.map