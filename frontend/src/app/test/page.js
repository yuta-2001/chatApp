'use client'
import axios from "../../libs/axios";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    axios.get("/api/books").then((res) => {
      const data = res.data;
      console.log(data);
    });
  }, []);

  return (
    <div>
      <h1>Test Page</h1>
    </div>
  )
}