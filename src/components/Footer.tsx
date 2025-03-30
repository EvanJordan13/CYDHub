'use client';

import Link from 'next/link';
import { Heading } from '@chakra-ui/react';
import { Box, Text, Link as ChakraLink, Flex } from '@chakra-ui/react';
import AnimatedLink from './AnimatedLink';
import { Globe } from 'lucide-react';
import GithubIcon from '../assets/GitHubIcon';
import AnimatedIcon from './AnimatedIcon';

interface FooterCard {
  heading: string;
  linkName: string;
  link: string;
}

const footerCards: FooterCard[] = [
  { heading: 'About', linkName: 'About Us', link: '/' },
  { heading: 'Company', linkName: 'FAQs', link: '/' },
  { heading: 'Contact', linkName: 'Contact Us', link: '/' },
  { heading: 'Partners', linkName: 'Sponsors', link: '/' },
];

export default function Footer() {
  return (
    <Box px={'80px'} py={'48px'} width={'100%'} height={'311px'} boxShadow="0 0px 4px 0px rgba(0, 0, 0, 0.25)">
      <Flex justifyContent="center" alignItems="center" gap={'209px'}>
        <Box>
          <Heading fontSize={'32px'} fontFamily={'logo'} fontWeight={'normal'} color={'Flamingo'}>
            Code Your Dreams
          </Heading>
          <Text fontSize={'16px'} fontWeight={'normal'} marginTop={'12px'}>
            Code Your Dreams is a Chicago nonprofit that empowers underrepresented communities through tech education,
            teaching app development, web development, and data science with project-based learning to inspire positive
            change.
          </Text>
          <Flex direction={'row'} gap={'24px'} marginTop={'20px'} color="Flamingo">
            <AnimatedIcon link="https://www.codeyourdreams.org/">
              <Globe />
            </AnimatedIcon>
            <ChakraLink href="https://github.com/CodeYourDreams" color={'Flamingo'} outline={'none'}>
              <GithubIcon />
            </ChakraLink>
          </Flex>
        </Box>
        <Flex direction={'row'} gap={'88px'}>
          {footerCards.map(({ heading, linkName, link }, index) => (
            <Flex key={index} direction={'column'} gap={'12px'} whiteSpace={'nowrap'}>
              <Text fontSize={'18px'} fontWeight={'bold'}>
                {heading}
              </Text>
              <AnimatedLink link={link} linkName={linkName} fontSize={'16px'} />
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}
