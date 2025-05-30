"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  const { user } = useUser();
  return (
    <section className="min-h-screen flex items-center bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center px-6 py-20 sm:px-8 sm:py-28 lg:flex-row lg:justify-between lg:py-32 lg:px-12">

        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-4xl font-extrabold sm:text-5xl tracking-tight">
            Generate{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI-Powered Courses
            </span>
            <br /> tailored for every learner
          </h1>

          <p className="mt-6 text-lg text-muted-foreground sm:text-xl sm:leading-relaxed">
            Empower your teaching and learning experience with GPTutor — the intelligent course generator that creates personalized content, quizzes, and study plans with ease.
          </p>

          {user ? (
            <div className="mt-10 flex justify-center gap-6 lg:justify-start">

              <Link
                href={"/dashboard"}
                className="rounded-lg cursor-pointer bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground shadow-lg transition hover:brightness-110"
              >
                Get Started
              </Link>

              <a
                href="#learn-more"
                className="rounded-lg border cursor-pointer border-border px-8 py-3 text-lg font-medium text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
              >
                Learn More
              </a>
            </div>
          ) : (
            <div className="mt-10 flex justify-center gap-6 lg:justify-start">
              <Link
                href={"/dashboard"}
                className="rounded-lg cursor-pointer bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground shadow-lg transition hover:brightness-110"
              >
                <SignInButton className="cursor-pointer">
                  Let's Begin
                </SignInButton>
              </Link>
              <a
                href="#learn-more"
                className="rounded-lg border cursor-pointer border-border px-8 py-3 text-lg font-medium text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
              >
                Learn More
              </a>
            </div>
          )}

        </div>

        <div className="mt-12 w-full max-w-sm flex-shrink-0 lg:mt-0 lg:max-w-md">
          <Image
            src="/course.png"
            alt="Hero illustration"
            width={400}
            height={400}
            className="w-full h-auto select-none"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
