"use client";

import { UserType } from "@/fsd/entities";
import { IndexedDB } from "@/fsd/features";
import { createContext } from "react";

export const IDBContext = createContext<IndexedDB | null>(null);
