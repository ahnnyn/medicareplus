import React, { useRef } from 'react';
import { Card, Carousel, Button, Avatar } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './hinhvuongslicer.scss';

const HinhVuongSlider = ({ items, urlDoctor, type }) => {
  const carouselRef = useRef(null);

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const chunkedItems = chunkArray(items, 4); // Chia mỗi lần hiển thị 3 item

  return (
    <div className="slider-container">
      {/* Nút bấm ngoài slider */}
      <Button 
        onClick={() => carouselRef.current.prev()} 
        className="slider-button left"
      >
        <LeftOutlined />
      </Button>

      <Carousel ref={carouselRef} draggable>
        {chunkedItems.map((chunk, chunkIndex) => (
          <div key={chunkIndex}>
            <div className="slider-wrapper">
              {chunk.map((item, index) => (
                <Card key={index} className="square-card" onClick={() => urlDoctor(item.id)}>
                  {/* Avatar cho bác sĩ hoặc hình ảnh cho chuyên khoa */}
                  {type === 'doctor' ? (
                    <Avatar 
                      shape="square" 
                      size={200} 
                      src={item.src} 
                    />
                  ) : (
                    <img 
                      className="specialty-image" 
                      src={item.src} 
                      alt={item.txtP} 
                      style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: '8px' }} 
                    />
                  )}

                  {/* Tên bác sĩ hoặc chuyên khoa */}
                  <p className="doctor-name">{item.txtP}</p>

                  {/* Mô tả chuyên khoa hoặc chuyên môn bác sĩ */}
                  <p className="doctor-department">{item.txtB}</p>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </Carousel>

      {/* Nút bấm ngoài slider */}
      <Button 
        onClick={() => carouselRef.current.next()} 
        className="slider-button right"
      >
        <RightOutlined />
      </Button>
    </div>
  );
};

export default HinhVuongSlider;
