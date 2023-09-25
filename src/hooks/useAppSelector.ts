import { TypedUseSelectorHook, useSelector } from "react-redux";
import { AppState } from "../redux/store";

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
