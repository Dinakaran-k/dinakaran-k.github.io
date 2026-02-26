import "dotenv/config";
import mongoose from "mongoose";
import { connectDb } from "../config/db.js";
import BlogPost from "../models/BlogPost.js";
import Profile from "../models/Profile.js";
import Project from "../models/Project.js";

async function seed() {
  await connectDb();

  await Promise.all([Profile.deleteMany({}), Project.deleteMany({}), BlogPost.deleteMany({})]);

  await Profile.create({
    name: "Dinakaran Kommunuri",
    headline: "Freelancer | Open to New Opportunities",
    location: "Andhra Pradesh, India",
    email: "dinakarankommunuri@gmail.com",
    phone: "+91 80964 75183",
    linkedin: "https://linkedin.com/in/dinakarankommunuri",
    githubUsername: "Dinakaran-k",
    summary:
      "Android Engineer with 4+ years building production-grade mobile apps using Kotlin and Flutter, with strong focus on performance, stability, and scalable architecture.",
    education: [
      {
        institution: "Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science & Technology, Chennai",
        degree: "B.Tech in Electronics and Communication Engineering",
        score: "CGPA: 8.25",
        startDate: "July 2017",
        endDate: "June 2021"
      }
    ],
    experiences: [
      {
        role: "Android Engineer (Engineer - SE)",
        company: "Innominds Software Pvt Ltd",
        startDate: "May 2025",
        endDate: "Present",
        achievements: [
          "Leading Android feature development from design to production release.",
          "Improving playback performance and reducing network usage in multimedia workflows.",
          "Owning crash analysis and production stability improvements."
        ]
      },
      {
        role: "Android Developer (Mobile App Engineer)",
        company: "Hexaware Technologies",
        startDate: "Aug 2021",
        endDate: "Nov 2024",
        achievements: [
          "Migrated Xamarin features to native Android Kotlin with performance gains.",
          "Reduced crash rates by about 30% with leak fixes and error handling.",
          "Optimized API calls and caching, reducing latency by around 25%."
        ]
      }
    ],
    skills: {
      Languages: ["Kotlin", "Java", "Dart", "C#"],
      "Mobile Development": ["Native Android", "Flutter", "Jetpack Compose", "Material Design", "XML"],
      Architecture: ["MVVM", "Clean Architecture", "MVI", "MVP"],
      Networking: ["Retrofit", "OkHttp", "REST APIs", "GraphQL", "WebSockets", "Dio"],
      "Data Storage": ["Room", "SQLite", "DataStore", "Hive"],
      "Tools & Quality": ["Android Studio", "Git", "SonarQube", "Firebase Crashlytics", "New Relic"]
    },
    openToWork: true
  });

  await Project.insertMany([
    {
      title: "Turito - Live Learning App",
      source: "freelance",
      description: "Modernized Android learning app with Jetpack Compose, MVVM, and improved maintainability/performance.",
      technologies: ["Kotlin", "Jetpack Compose", "MVVM", "Hilt", "Retrofit", "Firebase Crashlytics"],
      playStoreUrl: "https://play.google.com/store/search?q=turito&c=apps",
      featured: true
    },
    {
      title: "Ascott Star Rewards App",
      source: "freelance",
      description: "Contributed to migration from Xamarin to native Android and implemented booking/loyalty workflows.",
      technologies: ["Kotlin", "Jetpack Compose", "MVVM", "Hilt", "Room", "Retrofit"],
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.ascottcoltd.ascottstarrewards",
      featured: true
    },
    {
      title: "American Tower Site Access",
      source: "freelance",
      description: "Cross-platform mobile app work including feature delivery and App Center deployment support.",
      technologies: ["React Native", "App Center"],
      playStoreUrl: "https://play.google.com/store/search?q=American%20Tower%20Site%20Access&c=apps",
      featured: false
    }
  ]);

  await BlogPost.create({
    title: "How I reduced Android app crashes in production",
    slug: "reduced-android-app-crashes",
    excerpt: "A practical checklist for diagnosing memory leaks and stabilizing release builds.",
    content: "Draft post placeholder. Replace with your content.",
    tags: ["Android", "Performance", "Crashlytics"]
  });

  console.log("Seed complete");
  await mongoose.connection.close();
}

seed().catch(async (error) => {
  console.error(error);
  await mongoose.connection.close();
  process.exit(1);
});
