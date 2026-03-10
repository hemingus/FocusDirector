"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./Register.module.scss";

interface FormData {
  username: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("Form submitted:", formData);

  try {
    const response = await fetch("https://localhost:7172/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Registration failed:", response.status, errorText);
      return;
    }

    const data = await response.json();
    console.log("Registration success:", data);

    router.push("/login");
  } catch (error) {
    console.error("Failed to fetch register:", error);
  }
};

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.container__formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

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

        <button type="submit" className={styles.container__submit}>
          Register
        </button>
      </form>
    </div>
  );
}