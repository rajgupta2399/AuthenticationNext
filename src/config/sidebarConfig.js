// config/sidebarConfig.js
import {
  Grid,
  Users,
  BarChart3,
  Calendar,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  KanbanSquare,
  User,
  Settings,
  Shield,
  Database,
  FileText,
  ShoppingBag,
  TrendingDownIcon,
  Accessibility,
  RemoveFormatting,
  ReceiptPoundSterling,
  AmpersandIcon,
  Ampersand,
  LucideAccessibility,
  AudioWaveform,
  DiamondPercentIcon,
  DiscAlbumIcon,
  FileSignatureIcon,
  Projector,
  Newspaper,
  PartyPopper,
  CalendarRange,
  View,
  Clock,
  CardSim,
  PersonStanding,
  HousePlus,
  FolderGit,
  BookOpenText,
  NotepadText,
  CircleStar,
  LayoutDashboard,
} from "lucide-react";
import { ImGift } from "react-icons/im";
import { MdDesignServices, MdFeedback } from "react-icons/md";

const sidebarConfig = {
  superadmin: {
    main: [
      {
        name: "Super Dashboard",
        path: "/superadmin",
        icon: <Shield className="w-5 h-5" />,
      },
      {
        name: "Purchase & Selling & Reorder Reports",
        path: "/superadmin/profile",
        icon: <Users className="w-5 h-5" />,
      },
      {
        name: "Data Display",
        path: "/superadmin/analytics",
        icon: <Database className="w-5 h-5" />,
      },
      {
        name: "Donations",
        path: "/superadmin/donations",
        icon: <Grid className="w-5 h-5" />,
      },
      {
        name: "Donor Access",
        path: "/dashboard/donor",
        icon: <HeartHandshake className="w-5 h-5" />,
      },
      {
        name: "Alumni Access",
        path: "/dashboard/alumni",
        icon: <GraduationCap className="w-5 h-5" />,
      },
      {
        name: "Faculty Access",
        path: "/dashboard/faculty",
        icon: <BookOpen className="w-5 h-5" />,
      },
      {
        name: "Reports",
        icon: <BarChart3 className="w-5 h-5" />,
        subItems: [
          {
            heading: "Purchase And Selling Reports",
            icon: <ShoppingBag className="w-4 h-4" />,
            children: [
              {
                name: "Data Analytics",
                path: "/superadmin/analytics",
                icon: <FileText className="w-4 h-4" />,
              },
              {
                name: "Report B",
                path: "/dashboard/faculty/reports/purchase/b",
                icon: <FileText className="w-4 h-4" />,
              },
            ],
          },
          {
            heading: "Selling Reports",
            icon: <TrendingDownIcon className="w-4 h-4" />,
            children: [
              {
                name: "Report C",
                path: "/dashboard/faculty/reports/selling/c",
                icon: <FileText className="w-4 h-4" />,
              },
              {
                name: "Report D",
                path: "/dashboard/faculty/reports/selling/d",
                icon: <FileText className="w-4 h-4" />,
              },
            ],
          },
        ],
      },
    ],
    others: [
      {
        name: "Acess Controls",
        icon: <Accessibility className="w-5 h-5" />,
        subItems: [
          {
            heading: "Acess Reports",
            icon: <ReceiptPoundSterling className="w-4 h-4" />,
            children: [
              {
                name: "Admin Access Report Name",
                path: "/dashboard/faculty/reports/purchase/a",
                icon: <AudioWaveform className="w-4 h-4" />,
              },
              {
                name: "Donor Access",
                path: "/dashboard/faculty/reports/purchase/b",
                icon: <DiamondPercentIcon className="w-4 h-4" />,
              },
              {
                name: "Alumni Access",
                path: "/dashboard/faculty/reports/purchase/b",
                icon: <DiscAlbumIcon className="w-4 h-4" />,
              },
              {
                name: "Faculty Access",
                path: "/dashboard/faculty/reports/purchase/b",
                icon: <FileSignatureIcon className="w-4 h-4" />,
              },
            ],
          },
        ],
      },
    ],
  },

  donor: {
    main: [
      {
        name: "Dashboard",
        path: "/donor/dashboard",
        icon: <LayoutDashboard className="w-5 h-5" />,
      },
      {
        name: "Giving Back",
        path: "/donor/giving-back",
        icon: <ImGift className="w-5 h-5" />,
      },
      {
        name: "My Contributions",
        path: "/donor/donation-history",
        icon: <HeartHandshake className="w-5 h-5" />,
      },
      {
        name: "Initiated Programs",
        path: "/donor/initiated-programs",
        icon: <BarChart3 className="w-5 h-5" />,
      },
      {
        name: "Initiated Projects",
        path: "/donor/initiated-projects",
        icon: <BarChart3 className="w-5 h-5" />,
      },
      {
        name: "Noticeboard",
        path: "/donor/campus-news",
        icon: <Newspaper className="w-5 h-5" />,
      },
      {
        name: "Events",
        path: "/donor/events",
        icon: <PartyPopper className="w-5 h-5" />,
      },
      {
        name: "Give Feedback",
        path: "/donor/give-feedback",
        icon: <MdFeedback className="w-5 h-5" />,
      },
    ],
    others: [
      // {
      //   name: "Profile",
      //   path: "/dashboard/donor/profile",
      //   icon: <User className="w-5 h-5" />,
      // },
    ],
  },

  alumni: {
    main: [
      {
        name: "Dashboard",
        path: "/alumni/dashboard",
        icon: <LayoutDashboard className="w-5 h-5" />,
      },
      {
        name: "Giving Back",
        path: "/alumni/giving-back",
        icon: <ImGift className="w-5 h-5" />,
      },
      // {
      //   name: "My Contributions",
      //   path: "/alumni/donation-history",
      //   icon: <HeartHandshake className="w-5 h-5" />,
      // },
      // {
      //   name: "Initiated Programs",
      //   path: "/alumni/initiated-programs",
      //   icon: <BarChart3 className="w-5 h-5" />,
      // },
      // {
      //   name: "Initiated Projects",
      //   path: "/alumni/initiated-projects",
      //   icon: <BarChart3 className="w-5 h-5" />,
      // },
      // {
      //   name: "Noticeboard",
      //   path: "/alumni/campus-news",
      //   icon: <Newspaper className="w-5 h-5" />,
      // },
      // {
      //   name: "Events",
      //   path: "/alumni/events",
      //   icon: <PartyPopper className="w-5 h-5" />,
      // },
      {
        name: "Our Services",
        path: "/alumni/our-services",
        icon: <CardSim className="w-5 h-5" />,
      },
      {
        name: "Volunteer Mentorship",
        path: "/alumni/volunteer-mentorship-opportunity",
        icon: <PersonStanding className="w-5 h-5" />,
      },
      {
        name: "Wisdom House Booking",
        path: "/alumni/wisdom-house-booking",
        icon: <HousePlus className="w-5 h-5" />,
      },
      {
        name: "Alumni Directory",
        path: "/alumni/alumni-directory",
        icon: <FolderGit className="w-5 h-5" />,
      },
      {
        name: "Pledge List",
        path: "/alumni/pledge-list",
        icon: <BookOpenText className="w-5 h-5" />,
      },
      {
        name: "Surveys",
        path: "/alumni/surveys",
        icon: <NotepadText className="w-5 h-5" />,
      },
      {
        name: "Nomination",
        path: "/alumni/nomination",
        icon: <CircleStar className="w-5 h-5" />,
      },
      {
        name: "Give Feedback",
        path: "/alumni/give-feedback",
        icon: <MdFeedback className="w-5 h-5" />,
      },
    ],
    others: [
      // {
      //   name: "Profile",
      //   path: "/dashboard/alumni/profile",
      //   icon: <User className="w-5 h-5" />,
      // },
    ],
  },

  faculty: {
    main: [
      {
        name: "Impact Report",
        icon: <NotepadText className="w-5 h-5" />,
        subItems: [
          {
            children: [
              {
                name: "Submit Impact Report",
                path: "/faculty/impact-report/submit-impact-report",
                icon: <Newspaper className="w-4 h-4" />,
              },
              {
                name: "Final Submit Impact Report",
                path: "/faculty/impact-report/final-impact-report/:id",
                icon: <Clock className="w-4 h-4" />,
              },
            ],
          },
        ],
      },
      // {
      //   name: "Impact Report",
      //   path: "/faculty/impact-report",
      //   icon: <Grid className="w-5 h-5" />,
      // },
      {
        name: "CN Proposal",
        icon: <BookOpen className="w-5 h-5" />,
        subItems: [
          {
            children: [
              {
                name: "CN Proposal Dashboard",
                path: "/faculty/cn-proposals/cn-proposal-dashboard",
                icon: <Newspaper className="w-4 h-4" />,
              },
              {
                name: "CN/Proposal Form",
                path: "/faculty/cn-proposals/cn-proposal-form",
                icon: <Clock className="w-4 h-4" />,
              },
              {
                name: "Request Module",
                path: "/faculty/cn-proposals/cn-request-module",
                icon: <Clock className="w-4 h-4" />,
              },
              {
                name: "Request Revision Module",
                path: "/faculty/cn-proposals/cn-req-revision-module",
                icon: <Clock className="w-4 h-4" />,
              },
            ],
          },
        ],
      },
      {
        name: "Projects Report",
        path: "/faculty/projects/faculty-projects-report",
        icon: <GraduationCap className="w-5 h-5" />,
      },
      {
        name: "UC",
        path: "/faculty/uc",
        icon: <BarChart3 className="w-5 h-5" />,
      },
      {
        name: "Events",
        path: "/faculty/events",
        icon: <PartyPopper className="w-5 h-5" />,
      },

      {
        name: "Give Feedback",
        path: "/faculty/give-feedback",
        icon: <MdFeedback className="w-5 h-5" />,
      },

      // {
      //   name: "Events",
      //   icon: <PartyPopper className="w-5 h-5" />,
      //   subItems: [
      //     {
      //       heading: "Events Reports and Form",
      //       icon: <CalendarRange className="w-4 h-4" />,
      //       children: [
      //         {
      //           name: "Vew Events",
      //           path: "/faculty/events/view-events",
      //           icon: <View className="w-4 h-4" />,
      //         },
      //         {
      //           name: "Choose Time Slots",
      //           path: "/faculty/events/event-time",
      //           icon: <Clock className="w-4 h-4" />,
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
    others: [],
  },
  usdms: {
    main: [
      {
        name: "US DMS Portal",
        path: "/us-dms/portal",
        icon: <Grid className="w-5 h-5" />,
      },
      {
        name: "Give Feedback",
        path: "/us-dms/give-feedback",
        icon: <MdFeedback className="w-5 h-5" />,
      },
    ],
    others: [],
  },
  evaluation: {
    main: [
      {
        name: "Nominations",
        path: "/evaluation/nominations",
        icon: <Grid className="w-5 h-5" />,
      },
      {
        name: "Give Feedback",
        path: "/evaluation/give-feedback",
        icon: <MdFeedback className="w-5 h-5" />,
      },
    ],
    others: [],
  },
  moderator: {
    main: [
      {
        name: "Nominations",
        path: "/moderator/nominations",
        icon: <Grid className="w-5 h-5" />,
      },
      {
        name: "Give Feedback",
        path: "/moderator/give-feedback",
        icon: <MdFeedback className="w-5 h-5" />,
      },
    ],
    others: [],
  },
  donoralumni: {
    main: [
      {
        name: "Dashboard",
        path: "/donor-alumni/dashboard",
        icon: <LayoutDashboard className="w-5 h-5" />,
      },
      {
        name: "Noticeboard",
        path: "/donor-alumni/campus-news",
        icon: <NotepadText className="w-5 h-5" />,
      },
      {
        name: "Giving Back",
        path: "/donor-alumni/giving-back",
        icon: <ImGift className="w-5 h-5" />,
      },

      {
        name: "My Impact",
        icon: <NotepadText className="w-5 h-5" />,
        subItems: [
          {
            children: [
              {
                name: "Donation History",
                path: "/donor-alumni/donation-history",
                icon: <HeartHandshake className="w-5 h-5" />,
              },
              {
                name: "Programs",
                path: "/donor-alumni/initiated-programs",
                icon: <BarChart3 className="w-5 h-5" />,
              },
              {
                name: "Projects",
                path: "/donor-alumni/initiated-projects",
                icon: <BarChart3 className="w-5 h-5" />,
              },
            ],
          },
        ],
      },

      {
        name: "Network & Services",
        icon: <NotepadText className="w-5 h-5" />,
        subItems: [
          {
            children: [
              {
                name: "Student Services",
                path: "/donor-alumni/our-services",
                icon: <CardSim className="w-5 h-5" />,
              },
              {
                name: "Volunteer Mentors",
                path: "/donor-alumni/volunteer-mentorship-opportunity",
                icon: <BarChart3 className="w-5 h-5" />,
              },
              {
                name: "Housing Portal",
                path: "/donor-alumni/wisdom-house-booking",
                icon: <HousePlus className="w-5 h-5" />,
              },
              {
                name: "Alumni Directory",
                path: "/donor-alumni/alumni-directory",
                icon: <FolderGit className="w-5 h-5" />,
              },
            ],
          },
        ],
      },

      {
        name: "Pledge List",
        path: "/donor-alumni/pledge-list",
        icon: <BookOpenText className="w-5 h-5" />,
      },

      {
        name: "Participation",
        icon: <NotepadText className="w-5 h-5" />,
        subItems: [
          {
            children: [
              {
                name: "Surveys",
                path: "/donor-alumni/surveys",
                icon: <CardSim className="w-5 h-5" />,
              },
              {
                name: "Nominations",
                path: "/donor-alumni/nomination",
                icon: <CircleStar className="w-5 h-5" />,
              },
            ],
          },
        ],
      },

      {
        name: "Events",
        path: "/donor-alumni/events",
        icon: <PartyPopper className="w-5 h-5" />,
      },
      {
        name: "Give Feedback",
        path: "/donor-alumni/give-feedback",
        icon: <MdFeedback className="w-5 h-5" />,
      },

      // {
      //   name: "View Donation History",
      //   path: "/donor-alumni/donation-history",
      //   icon: <HeartHandshake className="w-5 h-5" />,
      // },
      // {
      //   name: "Initiated Programs",
      //   path: "/donor-alumni/initiated-programs",
      //   icon: <BarChart3 className="w-5 h-5" />,
      // },
      // {
      //   name: "Initiated Projects",
      //   path: "/donor-alumni/initiated-projects",
      //   icon: <BarChart3 className="w-5 h-5" />,
      // },
      // {
      //   name: "Our Services",
      //   path: "/donor-alumni/our-services",
      //   icon: <CardSim className="w-5 h-5" />,
      // },
      // {
      //   name: "Alumni Directory",
      //   path: "/donor-alumni/alumni-directory",
      //   icon: <FolderGit className="w-5 h-5" />,
      // },
      // {
      //   name: "Volunteer Mentorship",
      //   path: "/donor-alumni/volunteer-mentorship-opportunity",
      //   icon: <BarChart3 className="w-5 h-5" />,
      // },
      // {
      //   name: "Wisdom House Booking",
      //   path: "/donor-alumni/wisdom-house-booking",
      //   icon: <HousePlus className="w-5 h-5" />,
      // },

      // {
      //   name: "Surveys",
      //   path: "/donor-alumni/surveys",
      //   icon: <NotepadText className="w-5 h-5" />,
      // },
      // {
      //   name: "Nomination",
      //   path: "/donor-alumni/nomination",
      //   icon: <CircleStar className="w-5 h-5" />,
      // },

      // // show like this inn the sidebar with subitems
      // {
      //   name: "Main Section",
      //   icon: <PartyPopper className="w-5 h-5" />,
      //   subItems: [
      //     {
      //       children: [
      //         {
      //           name: "Contribute Events",
      //           path: "/donor-alumni/contribute-events",
      //           icon: <View className="w-4 h-4" />,
      //         },
      //         {
      //           name: "Contribute Time Slots",
      //           path: "/donor-alumni/contribute-time-slots",
      //           icon: <Clock className="w-4 h-4" />,
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
    others: [],
  },
};

export default sidebarConfig;

// admin: {
//   main: [
//     {
//       name: "Dashboard",
//       path: "/dashboard/admin",
//       icon: <Grid className="w-5 h-5" />,
//     },
//     {
//       name: "Users",
//       path: "/dashboard/admin/users",
//       icon: <Users className="w-5 h-5" />,
//     },
//     {
//       name: "Analytics",
//       path: "/dashboard/admin/analytics",
//       icon: <BarChart3 className="w-5 h-5" />,
//     },
//   ],
//   others: [
//     {
//       name: "Kanban",
//       path: "/dashboard/admin/kanban",
//       icon: <KanbanSquare className="w-5 h-5" />,
//     },
//     {
//       name: "Profile",
//       path: "/dashboard/admin/profile",
//       icon: <User className="w-5 h-5" />,
//     },
//   ],
// },
