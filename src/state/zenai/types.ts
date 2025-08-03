export interface ZenaiHistoryEntry {
  _id: string;
  inputText: string;
  datetime: number;
  response_text: string;
}

export interface ZenaiHistory {
  _id: string;
  user: string;
  title: string;
  history: ZenaiHistoryEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface ZenaiHistoryTitle {
  _id: string;
  title: string;
}

export interface ZenaiState {
  loading: boolean;
  error: string | null;
}

export interface GenerateTextSuccessResponse {
  zenai_model_id: string;
  history: ZenaiHistory;
}

export interface DeleteHistorySuccessResponse {
  zenai_model_id: string;
  history: ZenaiHistory;
}

export interface FetchZenaiHistorySuccessResponse {
  histories: ZenaiHistory[];
  total: number;
  page: number;
  limit: number;
}

export interface FetchAllHistoryTitleSuccessResponse {
  titles: ZenaiHistoryTitle[];
  total: number;
  page: number;
  limit: number;
}

export interface getHistoryEntrySuccessResponse {
  history: ZenaiHistory;
}