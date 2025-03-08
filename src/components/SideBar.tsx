import { Box, Image, Link, Text, Flex } from '@chakra-ui/react';
import Home from '../app/page';

function Bar(img: string, txt: string) {
   return (
      <Flex direction={"row"} borderRadius={"2xl"} height={"60px"} alignItems={"center"} paddingX={"20px"} paddingY={"16px"} gap={"16px"}>
         <Image src={img} height={"28px"}/>
         <Text color={"black"}>
            {txt}
         </Text>
      </Flex>
   );
}

export default function SideBar() {
   return (
      <Flex direction={"column"} paddingTop={"32px"} paddingBottom={"32px"} paddingLeft={"24px"} paddingRight={"24px"} justify={"space-between"} height={"100vh"} width={"208px"} boxShadow={"sm"}>
         <Flex direction={"column"} height={"456px"} gap={"20px"}>
            <Image src="cyd-dashboard-logo.svg" height={"44px"} width={"50px"} marginBottom={"12px"}/>
            {Bar("sidebar-home.svg", "Home")}
            {Bar("sidebar-todo.svg", "To do")}
            {Bar("sidebar-editor.svg", "Editor")}
            {Bar("sidebar-calendar.svg", "Calender")}
            {Bar("sidebar-shop.svg", "Shop")}
         </Flex>
         <Flex direction={"column"} height={"220px"} gap={"20px"}>
            {Bar("sidebar-archived.svg", "Archived")}
            {Bar("sidebar-settings.svg", "Settings")}
            {Bar("sidebar-log-out.svg", "Log Out")}
         </Flex>
      </Flex>
   );
}