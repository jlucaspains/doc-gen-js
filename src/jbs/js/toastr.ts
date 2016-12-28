// module Core.Web {
//     export class Toastr {
//         static error(message: string) {
//             return toastr["error"](message);
//         } 
//         static info(message: string) {
//             return toastr["info"](message);
//         } 
//         static warn(message: string) {
//             return toastr["warning"](message);
//         }
//         static success(message: string) {
//             return toastr["success"](message);
//         }
//         static show(message: string, messageType: string) {
//             switch (messageType) {
//                 case "info": return toastr["info"](message);
//                 case "error": return toastr["error"](message);
//                 case "warning": return toastr["warning"](message);
//                 case "success": return toastr["success"](message);
//                 default: return toastr["info"](message);
//             }
//         }
//     }
// }