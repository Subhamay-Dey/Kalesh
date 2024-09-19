import Hero from "@/components/base/Hero";
import React from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";

export default async function App() {

  const session = await getServerSession(authOptions)

  return (
    <div>
      <p>{JSON.stringify(session)}</p>
        <Hero/>
    </div>
  );
}