1. Giới thiệu paginate là gì ?
2. Yêu cầu của component ?
    1. Thay đổi search param trên url để đảm bảo refresh trang không bị mất page hiện tại
    2. Gắn thêm sự kiện onChange để khi sử dụng có thể add các logic cần thiết
    3. Có thể custom được tên của search param (mặc định là “page”) để tránh lỗi khi sử dụng 2 paginate trên cùng 1 page
3. Prop và value khác?
    1. totalProp: Thể hiện tổng số trang được render ra
    2. currentPage: Được lấy từ search query mặc định là “page” trên url