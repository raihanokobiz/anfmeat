"use server";

import { BASE_URL } from "@/config/config";
import {
  AllCategoryResponse,
  AllCategoryWithPaginationResponse,
  SingleCategoryResponse,
  TCategory,
} from "@/types/shared";

export async function createOffer(data: any) {
  const response = await fetch(`${BASE_URL}/offer`, {
    // headers: {
    //   "Content-Type": "application/json",
    // },
    method: "POST",
    body: data,
    // body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

export async function getAllOffer(): Promise<AllCategoryResponse> {
  const response = await fetch(`${BASE_URL}/offer`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

export async function getOfferWithPagination(
  page?: string,
  limit?: string
): Promise<AllCategoryWithPaginationResponse> {
  const queryParams = new URLSearchParams();
  if (page) queryParams.set("page", page);
  if (limit) queryParams.set("limit", limit);

  const response = await fetch(
    `${BASE_URL}/offer/pagination?${queryParams.toString()}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  return response.json();
}

export async function getOfferById(id: string): Promise<SingleCategoryResponse> {
  const response = await fetch(`${BASE_URL}/offer/${id}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

export async function updateOffer(id: string, data: any) {
  const response = await fetch(`${BASE_URL}/offer/${id}`, {
    method: "PUT",
    body: data,
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

export async function deleteOffer(id: string) {
  const response = await fetch(`${BASE_URL}/offer/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}
