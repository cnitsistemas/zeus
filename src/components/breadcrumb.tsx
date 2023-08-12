import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { BiChevronRight } from "react-icons/bi";

export default function BreadcrumbComponent({ breadcrumbItens }: { breadcrumbItens: any }) {
  return (<>
    <Breadcrumb
      spacing='8px'
      separator={<BiChevronRight />}
      mb={5}
      fontSize={16}>
      {breadcrumbItens && breadcrumbItens.length > 0 && breadcrumbItens.map((item: any, index: any) => {
        return <BreadcrumbItem key={index} isCurrentPage={!item?.link} color={!item?.link ? 'primary.400' : 'gray.500'}>
          <BreadcrumbLink href={item?.link}>{item?.name}</BreadcrumbLink>
        </BreadcrumbItem>
      })}
    </Breadcrumb>
  </>)
}