import type { Link } from "@/interfaces/Link"

const ShortcutLinks: Link[] = [
    {
        header: 'Your profile',
        description: 'Check out your profile',
        url: '/profile/me'
    },
    {
        header: 'Contact HR',
        description: 'Contact HR here',
        url: 'https://forms.gle/f9J3YDGXo5tU4W6b7',
    },
    {
        header: 'Calendar',
        description: 'Check out Orbit events',
        url: '/calendar',
    },
    {
        header: 'Search for Orbiter',
        description: 'Search for your friends',
        url: '/searchpage',
    },
    {
        header: 'Announcements',
        description: 'Announcements from Board',
        url: '/announcements',
    },
    {
        header: 'Blog',
        description: 'What is Orbit up to lately?',
        url: '/blog',
    },
    {
        header: 'Legacy page',
        description: 'View earlier Orbit teams',
        url: '/legacy',
    },
    {
        header: 'Meme gallery',
        description: 'Check out our digital meme page',
        url: '/memegallery',
    },
    {
        header: 'Link tree',
        description: 'Find a useful link',
        url: '/links',
    }
]

export default ShortcutLinks;