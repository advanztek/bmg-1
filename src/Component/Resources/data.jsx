// Sample data
export const resourcesData = [
    {
        id: 1,
        title: 'Complete Guide to Business Model Canvas',
        description: 'Master the art of creating effective business models with our comprehensive guide covering all nine building blocks.',
        type: 'Guide',
        category: 'Business Strategy',
        author: 'Sarah Johnson',
        date: '2024-12-01',
        readTime: '15 min read',
        downloads: 2340,
        views: 8920,
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
        content: {
            intro: 'The Business Model Canvas is a strategic management template used for developing new business models and documenting existing ones. It offers a visual chart with elements describing a firm\'s value proposition, infrastructure, customers, and finances.',
            sections: [
                {
                    title: 'Understanding the Nine Building Blocks',
                    content: 'The Business Model Canvas consists of nine essential components: Customer Segments, Value Propositions, Channels, Customer Relationships, Revenue Streams, Key Resources, Key Activities, Key Partnerships, and Cost Structure. Each block represents a crucial aspect of your business that needs careful consideration and planning.'
                },
                {
                    title: 'Getting Started',
                    content: 'Begin by identifying your customer segments and their specific needs. This forms the foundation upon which your entire business model will be built. Understanding who you serve is the first step to creating value.'
                },
                {
                    title: 'Value Proposition Design',
                    content: 'Your value proposition should clearly articulate how your product or service solves customer problems or satisfies their needs better than alternatives. It\'s the reason customers choose you over competitors.'
                },
                {
                    title: 'Implementation Strategy',
                    content: 'Once you\'ve completed your canvas, the next step is validation. Test your assumptions with real customers, iterate based on feedback, and continuously refine your business model as you learn more about your market.'
                }
            ],
            resources: [
                'Business Model Canvas Template (PDF)',
                'Video Tutorial Series (10 episodes)',
                'Case Study Collection (20+ examples)',
                'Interactive Workshop Materials',
                'Implementation Checklist'
            ]
        }
    },
    {
        id: 2,
        title: 'Financial Modeling for Startups',
        description: 'Learn how to build robust financial models that attract investors and guide your startup\'s growth trajectory.',
        type: 'Video Course',
        category: 'Finance',
        author: 'Michael Chen',
        date: '2024-11-28',
        readTime: '45 min watch',
        downloads: 1823,
        views: 6540,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        content: {
            intro: 'Financial modeling is crucial for startup success. This comprehensive course teaches you how to create financial projections, understand key metrics, and present your financials to investors with confidence.',
            sections: [
                {
                    title: 'Building Your First Model',
                    content: 'Start with revenue projections based on realistic assumptions about market size, customer acquisition, and pricing strategy. Learn to structure your model for maximum clarity and flexibility.'
                },
                {
                    title: 'Key Financial Metrics',
                    content: 'Master CAC, LTV, burn rate, runway, and other critical metrics that investors evaluate. Understand what each metric tells you about your business health and growth potential.'
                },
                {
                    title: 'Scenario Planning',
                    content: 'Create best case, worst case, and most likely scenarios to prepare for different outcomes. Learn how to stress test your model and plan for various market conditions.'
                }
            ],
            resources: [
                'Excel Template Pack (5 templates)',
                'Financial Metrics Cheat Sheet',
                'Investor Pitch Deck Template',
                'Video Walkthrough Series',
                'Real Startup Examples'
            ]
        }
    },
    {
        id: 3,
        title: 'Digital Marketing Essentials',
        description: 'A comprehensive toolkit for launching and scaling your digital marketing campaigns across all major channels.',
        type: 'Toolkit',
        category: 'Marketing',
        author: 'Emily Rodriguez',
        date: '2024-11-25',
        readTime: '20 min read',
        downloads: 3456,
        views: 12340,
        image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&q=80',
        content: {
            intro: 'Digital marketing is essential for modern businesses. This toolkit provides everything you need to create, launch, and optimize your marketing campaigns across multiple channels.',
            sections: [
                {
                    title: 'Channel Strategy',
                    content: 'Understand which channels work best for your business and how to allocate your marketing budget effectively across social media, search, email, and content marketing.'
                },
                {
                    title: 'Content Creation',
                    content: 'Learn to create compelling content that resonates with your target audience and drives conversions. Master the art of storytelling for business.'
                },
                {
                    title: 'Analytics and Optimization',
                    content: 'Track the right metrics, analyze campaign performance, and continuously improve your marketing ROI through data-driven decision making.'
                }
            ],
            resources: [
                'Social Media Calendar Template',
                'Content Creation Checklist',
                'Analytics Dashboard Template',
                'Email Marketing Templates',
                'SEO Optimization Guide'
            ]
        }
    },
    {
        id: 4,
        title: 'Product Development Framework',
        description: 'From ideation to launch, master the complete product development lifecycle with this practical framework.',
        type: 'Framework',
        category: 'Product',
        author: 'David Park',
        date: '2024-11-20',
        readTime: '25 min read',
        downloads: 1987,
        views: 7650,
        image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80',
        content: {
            intro: 'Successful product development requires a systematic approach. This framework guides you through every stage from concept to market launch, helping you build products customers love.',
            sections: [
                {
                    title: 'Discovery Phase',
                    content: 'Learn to validate your product idea through customer research, competitive analysis, and market assessment. Avoid building products nobody wants.'
                },
                {
                    title: 'MVP Development',
                    content: 'Build a minimum viable product that tests your core assumptions with minimal resources. Learn what features to include and what to leave out.'
                },
                {
                    title: 'Launch and Iterate',
                    content: 'Execute a successful product launch and establish feedback loops for continuous improvement. Learn from early adopters and iterate rapidly.'
                }
            ],
            resources: [
                'Product Roadmap Template',
                'User Research Guide',
                'Launch Checklist',
                'Feature Prioritization Matrix',
                'User Testing Scripts'
            ]
        }
    },
    {
        id: 5,
        title: 'Legal Basics for Entrepreneurs',
        description: 'Navigate the legal landscape of entrepreneurship with confidence. Essential knowledge for protecting your business.',
        type: 'Guide',
        category: 'Legal',
        author: 'Jennifer Lee',
        date: '2024-11-15',
        readTime: '18 min read',
        downloads: 2156,
        views: 5890,
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
        content: {
            intro: 'Understanding the legal aspects of your business is crucial for long-term success. This guide covers essential legal topics every entrepreneur should know to protect their business and avoid costly mistakes.',
            sections: [
                {
                    title: 'Business Structure',
                    content: 'Choose the right legal structure for your business: sole proprietorship, LLC, corporation, or partnership. Each has different implications for taxes, liability, and operations.'
                },
                {
                    title: 'Intellectual Property',
                    content: 'Protect your ideas, brand, and innovations through trademarks, patents, and copyrights. Learn what\'s protectable and how to secure your IP rights.'
                },
                {
                    title: 'Contracts and Agreements',
                    content: 'Understand essential business contracts including customer agreements, vendor contracts, employment agreements, and NDAs. Know what to include and what to avoid.'
                }
            ],
            resources: [
                'Legal Checklist for Startups',
                'Contract Templates Library',
                'IP Protection Guide',
                'Terms and Conditions Generator',
                'Legal Resources Directory'
            ]
        }
    },
    {
        id: 6,
        title: 'Scaling Your Team',
        description: 'Strategic approaches to hiring, onboarding, and building a high-performing team as your business grows.',
        type: 'Playbook',
        category: 'HR & Operations',
        author: 'Robert Martinez',
        date: '2024-11-10',
        readTime: '22 min read',
        downloads: 1765,
        views: 4320,
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
        content: {
            intro: 'Scaling your team effectively is one of the biggest challenges in growing a business. This playbook provides proven strategies for building and managing teams that drive business success.',
            sections: [
                {
                    title: 'Hiring Strategy',
                    content: 'Develop a systematic approach to identifying, attracting, and selecting the right talent for your organization. Learn to hire for culture fit and future potential.'
                },
                {
                    title: 'Team Culture',
                    content: 'Build a strong culture that attracts top talent and keeps your team engaged and productive. Define your values and make them actionable.'
                },
                {
                    title: 'Performance Management',
                    content: 'Implement systems for goal setting, feedback, and development that help your team members grow and contribute their best work.'
                }
            ],
            resources: [
                'Job Description Templates',
                'Interview Question Bank',
                'Onboarding Checklist',
                'Performance Review Templates',
                'Culture Building Workshop'
            ]
        }
    }
];