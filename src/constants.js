const statuses = [
    {
        id: 1,
        name: "toDo",
        description: "Task is planned and pending execution.",
        tasks: [
            {
                id: 234634,
                title: "Implement Authentication",
                description: "Develop the authentication module including login, registration, and password recovery.",
                priority: "Medium",
                assignee: "Alice Johnson",
                dueDate: "2024-09-05",
                tags: ["Backend", "Security"],
                comments: [
                    {
                        author: "Mike Brown",
                        text: "Use OAuth2 for third-party login integrations.",
                        date: "2024-08-21"
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "inProgress",
        description: "Task is currently being worked on.",
        tasks: [
            {
                id: 112312,
                title: "Design Homepage",
                description: "Create the initial design for the homepage including wireframes and prototypes.",
                priority: "High",
                assignee: "John Doe",
                dueDate: "2024-09-01",
                tags: ["Design", "UI/UX"],
                comments: [
                    {
                        author: "Jane Smith",
                        text: "Make sure to follow the brand guidelines.",
                        date: "2024-08-20"
                    },
                    {
                        author: "Paul Lee",
                        text: "Consider adding a hero section with a call to action.",
                        date: "2024-08-22"
                    }
                ]
            },
            {
                id: 1347585,
                title: "Create Marketing Campaign",
                description: "Develop a comprehensive marketing campaign for the upcoming product launch, including social media, email, and ad strategies.",
                priority: "High",
                assignee: "Emma Williams",
                dueDate: "2024-09-15",
                tags: ["Marketing", "Launch"],
                comments: [
                    {
                        author: "Liam Brown",
                        text: "Focus on Instagram and LinkedIn as primary channels.",
                        date: "2024-08-18"
                    },
                    {
                        author: "Olivia Taylor",
                        text: "Don’t forget to set up A/B testing for email subject lines.",
                        date: "2024-08-19"
                    }
                ]
            },
            {
                id: 10123456,
                title: "Redesign Website Homepage",
                description: "Create a new design for the website homepage to improve user engagement.",
                priority: "High",
                assignee: "John Doe",
                dueDate: "2024-09-30",
                tags: ["UI/UX", "Design"],
                comments: [
                    {
                        author: "Jane Smith",
                        text: "Initial wireframe looks great, but let's add more visual elements.",
                        date: "2024-09-15"
                    }
                ]
            },
            {
                id: 40456789,
                title: "Backend API Optimization",
                description: "Improve the performance of the backend API by optimizing database queries.",
                priority: "Critical",
                assignee: "Marcin Kowalski",
                dueDate: "2024-10-01",
                tags: ["API", "Backend", "Performance"],
                comments: [
                    {
                        author: "Daniel King",
                        text: "I've noticed slower response times in the user data endpoints, worth checking.",
                        date: "2024-09-18"
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        name: "onHold",
        description: "Task is paused and waiting for some resolution before resuming.",
        tasks: [
            {
                id: 3528469,
                title: "Test Payment Gateway",
                description: "Ensure that the payment gateway is functioning correctly in all supported regions.",
                priority: "High",
                assignee: "Robert Green",
                dueDate: "2024-09-10",
                tags: ["Testing", "Payment"],
                comments: [
                    {
                        author: "Emily Davis",
                        text: "Blocked by issue with regional taxes.",
                        date: "2024-08-23"
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        name: "completed",
        description: "Task has been finished.",
        tasks: [
            {
                id: 45428665,
                title: "Content Creation for Blog",
                description: "Write and publish 5 new blog posts focused on SEO best practices.",
                priority: "Low",
                assignee: "Sophia White",
                dueDate: "2024-08-15",
                tags: ["Content", "SEO"],
                comments: [
                    {
                        author: "Daniel King",
                        text: "Great work! The posts are performing well.",
                        date: "2024-08-16"
                    }
                ]
            },
            {
                id: 30345678,
                title: "Quarterly Sales Report",
                description: "Prepare the sales report for Q3 with detailed analysis and trends.",
                priority: "High",
                assignee: "Philip Brown",
                dueDate: "2024-09-20",
                tags: ["Sales", "Reporting"],
                comments: [
                    {
                        author: "Sophia White",
                        text: "The report looks good, but we need to include more data on regional sales.",
                        date: "2024-09-22"
                    }
                ]
            }
        ]
    },
    {
        id: 5,
        name: "notStarted",
        description: "Task has not been started yet.",
        tasks: [
            {
                id: 20234567,
                title: "Social Media Campaign Launch",
                description: "Plan and execute the next social media campaign focusing on brand awareness.",
                priority: "Medium",
                assignee: "Eve Watson",
                dueDate: "2024-10-05",
                tags: ["Marketing", "Social Media"],
                comments: [
                    {
                        author: "Alex Green",
                        text: "We should consider TikTok as a platform for this campaign.",
                        date: "2024-09-12"
                    }
                ]
            }
        ]
    }
];

export default statuses;
