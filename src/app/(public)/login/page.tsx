"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "../register/Register.module.scss";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  console.log("Login attempt:", formData);

  try {
    const response = await fetch("https://localhost:7172/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Login failed:", response.status, errorText);
      return;
    }

    const data = await response.json();
    console.log("Login success:", data);

    router.push("/Dashboard");
  } catch (error) {
    console.error("Failed to fetch login:", error);
  }
};

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>Login</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.container__formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.container__formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className={styles.container__submit}
        >
          Login
        </button>
      </form>
    </div>
  );
}