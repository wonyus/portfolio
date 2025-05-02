export interface CarreerPath {
    title?: string;
    description?: string;
    organization?: string;
    date?: string;
    location?: string;
}

export const carreerPath: CarreerPath[] = [
    {
        organization: "KASIKORN Business-Technology Group (KBTG)",
        title: "Software Engineer",
        description:
            "Developing high-performance applications using Golang and Node.js. Implementing CI/CD pipelines with Jenkins, managing batch jobs with Control-M, and deploying Next.js applications with OpenResty. Enhancing security with Azure AD authentication, optimizing search engine indexing, and automating metadata updates.",
        date: "Jun 2023 - Present (1 year 10 months)",
        location: "Bangkok, Thailand",
    },
    {
        organization: "National ITMX Co., Ltd. - Internship",
        title: "Frontend Web Developer",
        description:
            "Built responsive UI components using Material-UI and developed modular components in React and Next.js. Managed large-scale data from REST APIs, optimized state management, and refactored code for better performance and maintainability.",
        date: "Jan 2023 - May 2023 (5 months)",
        location: "Bangkok, Thailand",
    },
    {
        organization: "AppMan Co., Ltd. - Part-time",
        title: "Full Stack Developer",
        description:
            "Developed middleware using Node.js and built interactive web applications with React and Next.js. Deployed and managed applications on AWS EC2, optimized system performance with CloudWatch, and integrated AWS SES for automated email notifications. Developed serverless functions with AWS Lambda to improve efficiency.",
        date: "Jun 2022 - Nov 2022 (6 months)",
        location: "Bangkok, Thailand",
    },
    {
        title: "Thammasat University",
        description: "Faculty of Sofware Engineering and Business management",
        date: "2019 - 2023 (4 years)",
    },
];
