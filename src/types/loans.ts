export type BookInfo = {
  _id: string
  title: string
  img: string
}

export type LoanInfo = {
  borrowed_Date: string
  returned_Date?: string | null
  book: BookInfo
  returned: boolean
}

export type BorrowBookRequest = {
  id: string[]
  accessToken: string
}

export type ReturnBookRequest = {
  id: string[]
  accessToken: string
}

export type ReturnedHistory = {
  history: LoanInfo[]
}
