// "use client";

// import { SlashIcon } from "@radix-ui/react-icons";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { usePathname } from "next/navigation";

// export default function BreadcrumbNavbar() {
//   const paths = usePathname();
//   const pathNames = paths.split("/").filter(Boolean);

//   return (
//     <Breadcrumb>
//       <BreadcrumbList>
//         <BreadcrumbItem>
//           <BreadcrumbLink
//             className=" text-base font-medium text-foreground"
//             href="/"
//           >
//             GLA Project Tracker
//           </BreadcrumbLink>
//         </BreadcrumbItem>
//         <BreadcrumbSeparator>
//           <SlashIcon />
//         </BreadcrumbSeparator>
//         {pathNames.map((path, index) => (
//           <BreadcrumbItem key={index}>
//             <BreadcrumbLink
//               className=" text-base font-medium text-foreground"
//               href={`/${path}`}
//             >
//               {path}
//             </BreadcrumbLink>
//           </BreadcrumbItem>
//         ))}
//       </BreadcrumbList>
//     </Breadcrumb>
//   );
// }
