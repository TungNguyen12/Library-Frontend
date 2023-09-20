import { useDispatch } from "react-redux";
import { PeteDispatch } from "../redux/store";

export const useAppDispatch: () => PeteDispatch = useDispatch;
