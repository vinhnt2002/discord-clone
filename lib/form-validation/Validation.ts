import * as z from 'zod'

export const ServerValidation = z.object({
    name: z.string().min(3, {message: "Hãy nhập ít nhất 3 kí tự"}),
    imgUrl: z.string().min(1, {message: "Hãy thêm ít nhất 1 ảnh"})
})