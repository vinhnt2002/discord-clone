// NOTE  

// Đầu tiên kiểm tra xác thực user với currentProfile. Nếu không có trả về 401.

// Lấy channelId từ query params. Nếu không có trả về 400.

// Lấy cursor từ query params nếu có để phân trang.

// Sử dụng Prisma db.message để query messages:

// Nếu có cursor thì lấy bắt đầu từ message đó, số lượng MESSAGES_BATCH.
// Nếu không thì lấy recent MESSAGES_BATCH.
// Sắp xếp DESC theo createdAt.
// Include thông tin member và profile.
// Sau khi lấy được data, kiểm tra độ dài để lấy id của message cuối dùng làm nextCursor.

// Cuối cùng trả về JSON chứa messages và nextCursor.

// Đây là logic để fetch và phân trang messages từ db dựa trên channelId.

// Phía client sẽ sử dụng nextCursor để fetch page tiếp theo thông qua React Query useInfiniteQuery.


import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { Message } from "@prisma/client";
import { NextResponse } from "next/server"

const MESSAGES_BATCH = 10;

export async function GET(req: Request) {
 try {
    
   const profile = await currentProfile();
   const {searchParams} = new URL(req.url)

   const cursor = searchParams.get("cursor")
   const channelId = searchParams.get("channelId")

   if(!profile){
      return new NextResponse("Unauthorze", {status: 401})
   }

   if(!channelId){
      return new NextResponse("channelId is missing", {status: 400})
   }

   let messages : Message[] = [];

   if (cursor) {
     messages = await db.message.findMany({
       take: MESSAGES_BATCH,
       skip: 1,
       cursor: {
         id: cursor,
       },
       where: {
         channelId,
       },
       include: {
         member: {
           include: {
             profile: true,
           },
         },
       },
       orderBy: {
         createdAt: "desc",
       },
     });
   } else {
     messages = await db.message.findMany({
       take: MESSAGES_BATCH,
       where: {
         channelId,
       },
       include: {
         member: {
           include: {
             profile: true,
           },
         },
       },
       orderBy: {
         createdAt: "desc",
       },
     });
   }

   let nextCursor = null;

   if(messages.length === MESSAGES_BATCH){
      nextCursor = messages[MESSAGES_BATCH - 1].id
   }
   

   return NextResponse.json({items: messages, nextCursor})

 } catch (error) {
    console.log("MESSAGE_GET ERROR", error)
    return new NextResponse("Internal Error", {status: 500})
 }   
}


// ví dụ 

// API route 

// export async function GET(req) {

//   // Lấy cursor từ query params
//   const { cursor } = req.query; 
  
//   // Truy vấn db
//   let messages = [];
  
//   if (cursor) {
//     // Nếu có cursor, lấy bắt đầu từ message đó
//     messages = await db.find({
//       take: 10,
//       skip: 1,
//       cursor: { id: cursor } 
//     })

//   } else {
//     // Nếu không có, lấy 10 mới nhất
//     messages = await db.find({ take: 10}) 
//   }

//   // Tính toán xem có next page không
//   let nextCursor;
//   if (messages.length === 10) {
//     // Lấy id message cuối để làm next cursor 
//     nextCursor = messages[messages.length - 1].id; 
//   }

//   // Trả về kết quả
//   return {
//     messages,
//     nextCursor
//   }

// }