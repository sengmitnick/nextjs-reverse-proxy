import { handleRequest } from "@/utils";

export const runtime = "edge";
export const dynamic = "force-dynamic"; // defaults to auto

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
export const OPTIONS = handleRequest;
