import React from "react";
import { Container, Paper, Typography, Box } from "@mui/material";

const AboutUs = () => {
  return (
    <Container>
      <Paper
        elevation={3}
        sx={{
          padding: (theme) => theme.spacing(4),
          marginTop: (theme) => theme.spacing(4),
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            marginBottom: (theme) => theme.spacing(2),
            color: "#333",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          About Us
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{
            marginBottom: (theme) => theme.spacing(2),
            color: "#555",
            lineHeight: 1.6,
          }}
        >
          Welcome to our delivery app platform, developed by Ram Agrawal. This
          website demonstrates my journey in mastering full stack development using
          the MERN stack. It highlights my commitment to creating a reliable and 
          user-friendly delivery service.
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{
            marginBottom: (theme) => theme.spacing(2),
            color: "#555",
            lineHeight: 1.6,
          }}
        >
          I am Ram Agrawal, a software developer with a passion for full stack
          development and a strong background in software engineering. My journey 
          in tech began with a solid foundation in C, C++, and Java, and evolved into 
          mastering JavaScript, TypeScript, and various front-end and back-end 
          technologies. My experience includes building scalable applications, developing 
          interactive user interfaces, and creating robust APIs.
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{
            marginBottom: (theme) => theme.spacing(2),
            color: "#555",
            lineHeight: 1.6,
          }}
        >
          Our delivery app offers a seamless experience for both users and restaurant 
          owners. Key functionalities include:
          <Box component="ul" sx={{ pl: 2, color: "#555", lineHeight: 1.6 }}>
            <li>
              <strong>User Registration and Authentication:</strong> Secure user registration and login, with features for updating profiles and delivery addresses.
            </li>
            <li>
              <strong>Restaurant Listings and Menus:</strong> Browse a list of available restaurants, view their menus, and add items to your cart.
            </li>
            <li>
              <strong>Order Placement and Checkout:</strong> Place orders easily, customize items, and choose delivery or pickup options.
            </li>
            <li>
              <strong>Feedback and Reviews:</strong> Rate and review restaurants and dishes, and view ratings to make informed decisions.
            </li>
            <li>
              <strong>Admin Dashboard:</strong> Manage restaurants, menus, orders, and users, with analytics and reporting features.
            </li>
          </Box>
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{
            marginBottom: (theme) => theme.spacing(2),
            color: "#555",
            lineHeight: 1.6,
          }}
        >
          I hold a B.Tech in Computer Engineering from Dr. Babasaheb Ambedkar
          Technological University and have professional experience as a Member
          of Technical Staff at CCTech, where I contributed to various
          innovative projects. My portfolio includes:
          <Box component="ul" sx={{ pl: 2, color: "#555", lineHeight: 1.6 }}>
            <li>Villa Configurator App: An interactive tool for designing custom villas.</li>
            <li>Deep Admin Website: A web scraping platform with a user-friendly interface and efficient data management.</li>
          </Box>
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{
            marginBottom: (theme) => theme.spacing(2),
            color: "#555",
            lineHeight: 1.6,
          }}
        >
          Outside of work, I enjoy listening to music, trekking, competitive
          coding, and solving puzzles. My passion for continuous learning and
          problem-solving drives my ambition to excel in the field of software
          development.
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{
            marginBottom: (theme) => theme.spacing(2),
            color: "#555",
            lineHeight: 1.6,
          }}
        >
          For more details about my projects and professional journey, you can
          visit my{" "}
          <a
            href="https://github.com/ramagrawal2001"
            style={{ color: "#1976d2", textDecoration: "none" }}
          >
            GitHub
          </a>{" "}
          and{" "}
          <a
            href="https://www.linkedin.com/in/ram-agrawal123/"
            style={{ color: "#1976d2", textDecoration: "none" }}
          >
            LinkedIn
          </a>{" "}
          profiles.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: (theme) => theme.spacing(2),
            color: "#555",
            lineHeight: 1.6,
          }}
        >
          Thank you for visiting. Feel free to explore the platform, and if you
          have any questions or need assistance, please use the contact page.
          Your feedback is invaluable as I strive to improve and expand my
          skills in web development.
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutUs;
