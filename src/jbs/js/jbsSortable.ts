// module Core.Web {
//     export class JbsSortable {

//         static create(obj: JQuery, options: JQuerySortable.Options, beforeDrop?: Function) {

//             if (beforeDrop !== null && beforeDrop !== undefined) {
//                 options.onDrop = ($item: any, container: any, _super: any, event: any) => {
//                     $item.removeClass(container.group.options.draggedClass).removeAttr("style");
//                     $("body").removeClass(container.group.options.bodyClass);
//                     beforeDrop();
//                 };
//             }

//             obj.addClass("sorted_table");
//             obj.sortable(options);

//         }

//     }
// }
