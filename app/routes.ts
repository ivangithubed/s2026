import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("courses", "routes/courses.tsx"),
  route("contact", "routes/contact.tsx"),
  route("about", "routes/about.tsx"),
  route("courses/:courseId", "routes/courses.$courseId.tsx"),
  route("feedback", "routes/feedback.tsx"),
  route("*", "routes/notfound.tsx"),
] satisfies RouteConfig;
