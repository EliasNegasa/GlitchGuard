'use client';
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoBugSharp } from 'react-icons/io5';

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data } = useSession();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];

  return (
    <nav className="border-b mb-5 px-5 py-5 items-center">
      <Container>
        <Flex justify="between" align='center'>
          <Box>
            <Flex align="center" gap="4">
              <Link href="/">
                <IoBugSharp />
              </Link>
              <ul className="flex space-x-6">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={classNames({
                        'text-zinc-900': link.href === currentPath,
                        'text-zinc-500': link.href !== currentPath,
                        'hover:text-zinc-800 transition-colors': true,
                      })}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Flex>
          </Box>
          <Box>
            {status === 'authenticated' && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={data.user!.image!}
                    fallback="?"
                    size="2"
                    radius="full"
                    className="cursor-pointer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text>{data.user!.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>Logout</DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === 'unauthenticated' && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
