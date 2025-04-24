ติดตั้ง โปรเจค
คำสั่ง npm create vite@latest

ทำ routes 
ติดตั้ง react router dom
คำสั่ง npm install react-router-dom

สร้างโฟล์เดอร์ Routes
สร้างไฟล์ AppRoutes.jsx

นำไปเรียกใช้ ใน ไฟล์ App.jsx

กลับมาทำ path และ สร้างโฟล์เดอร์ paeg แต่ละ path 
สร้างโฟล์เดอร์ Layout เพื่อจัดการ path layout 

--------------------Register------------------
ทำ UI และ Fuction Form

ติดตั้ง axios 
คำสั่ง npm i axios

Axios คือ library ตัวหนึ่งของ JavaScript, TypeScript ที่ใช้ในการจัดการกับ API ด้วยวิธี HTTP methods ในที่นี้ จะเป็นการจัดการ ทางฝั่ง request หรือก็คือ HTTP Request Methods นั่นเอง ซึ่งจะมีอยู่ 4 วิธี ที่ใช้กันบ่อยก็ คือ Get, Post, Put และ Delete เรามาดูกันดีกว่า แต่ละวิธี มีไว้ทำอะไรได้บ้าง

Get – Retreive สำหรับขอ request จาก server เช่น รายชื่อทั้งหมด หรือรายชื่อเดี่ยว
Post – Send การส่งค่าข้อมูล
Put – Update การเปลี่ยนแปลง หรือ Update ค่าเก่าให้เป็น ค่าใหม่ที่เราต้องการ เช่น การเปลี่ยนชื่อของ users
Delete – Remove การลบค่า


npm i zustand