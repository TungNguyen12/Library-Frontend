import { TypedUseSelectorHook, useSelector } from "react-redux";
import { PeteState } from "../redux/store";

export const useAppSelector: TypedUseSelectorHook<PeteState> = useSelector;
