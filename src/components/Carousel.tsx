'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Carousel = ({ images }: { images: string[] }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const handleNextPage = () => {
        setCurrentPage((prev) => (prev + 1) % images.length);
    }
      
    const handlePrevPage = () => {
        setCurrentPage((prev) => (prev - 1 + images.length) % images.length);
    }

    return (
        <div style={{ height: "100%", width: "100%" }}>
            <div style={{
                display: 'flex',
                overflow: 'auto',
                flexDirection: "row",
                justifyContent: "space-between",
                height: "calc(100% - 40px)",
                width: "100%"
            }}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        style={{
                            flex: "0 0 auto",
                            height: "100%",
                            width: "100%",
                            transform: `translateX(${currentPage * -100}%)`,
                            transition: "transform 0.5s",
                            alignContent: "center",
                        }}
                    >
                        <Card style={{ margin: '0 auto' }}>
                            <CardContent>
                                <CardMedia
                                    style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                    component="img"
                                    image={image}
                                    alt={image}
                                />
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
            <IconButton onClick={handlePrevPage}>
                <NavigateBeforeIcon />
            </IconButton>
            <IconButton onClick={handleNextPage}>
                <NavigateNextIcon />
            </IconButton>
        </div>
    );
};

export default Carousel;
