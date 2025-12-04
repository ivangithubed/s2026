import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("courses", "routes/courses.tsx"),
  route("contact", "routes/contact.tsx"),
  route("about", "routes/about.tsx"),
  route("courses/:courseId", "routes/courses.$courseId.tsx"),
  route("reviews", "routes/reviews.tsx"),
  route("reviews/:reviewId", "routes/reviews.$reviewId.tsx"),
  route("parent-reviews", "routes/parent-reviews.tsx"),
  route("parent-reviews/:reviewId", "routes/parent-reviews.$reviewId.tsx"),
  route("feedback", "routes/feedback.tsx"),
  route("parent-survey", "routes/parent-survey.tsx"),
  route("tools", "routes/tools.tsx"),
  route("tools/grid-generator", "routes/tools.grid-generator.tsx"),
  route("*", "routes/notfound.tsx"),
] satisfies RouteConfig;
