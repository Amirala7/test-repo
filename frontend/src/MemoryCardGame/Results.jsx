import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { styled } from "@mui/system";
import background from "../assets/images/play.gif";
import bgMusic from "../assets/audio/background-music.mp3";
import { memoryRepository } from '../repositories/memoryRepository';

const PixelBox = styled(Box)(({ theme }) => ({
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    fontFamily: '"Press Start 2P", cursive',
    position: "relative",
}));

const TableTitle = styled(Box)(({ theme }) => ({
    color: "#fff",
    fontSize: "28px",
    marginBottom: "20px",
    textAlign: "center",
    textShadow: "0 0 10px rgba(0, 217, 255, 0.7)",
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    maxWidth: "80%",
    maxHeight: "60vh",
    backgroundColor: "rgba(30, 30, 46, 0.85)",
    borderRadius: "20px",
    border: "2px solid #4a4e69",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    overflow: "auto",
}));

const StyledTable = styled(Table)(({ theme }) => ({
    minWidth: 650,
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: "rgba(44, 44, 84, 0.9)",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    color: "#fff",
    fontFamily: '"Press Start 2P", cursive',
    fontSize: "14px",
    padding: "16px",
    borderBottom: "1px solid #4a4e69",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: "rgba(64, 64, 122, 0.4)",
    },
    "&:hover": {
        backgroundColor: "rgba(0, 217, 255, 0.2)",
        cursor: "pointer",
    },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
}));

const PixelButton = styled(Box)(({ theme }) => ({
    display: "inline-block",
    backgroundColor: "#2c2c54",
    color: "#fff",
    fontFamily: '"Press Start 2P", cursive',
    fontSize: "16px",
    padding: "15px 30px",
    border: "3px solid #00d9ff",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)",
    cursor: "pointer",
    textAlign: "center",
    transition: "transform 0.3s, background-color 0.3s, box-shadow 0.3s",
    "&:hover": {
        backgroundColor: "#40407a",
        borderColor: "#00aaff",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
    },
    "&:active": {
        transform: "scale(0.95)",
    },
}));

const Results = () => {
    const navigate = useNavigate();
    const audioRef = useRef(null);
    const [bgVolume] = useState(
        parseInt(localStorage.getItem("bgVolume"), 10) || 50
    );
    const [gameResults, setGameResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGameResults = async () => {
            try {
                const userID = localStorage.getItem("userID");
                if (!userID) {
                    console.error("Error: userID is missing.");
                    return;
                }
                const results = await memoryRepository.getGameResults(userID);
                setGameResults(results);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching game results:", error);
                setGameResults([]);
                setLoading(false);
            }
        };

        fetchGameResults();
    }, []);

    useEffect(() => {
        audioRef.current = new Audio(bgMusic);
        const audio = audioRef.current;
        audio.loop = true;
        audio.volume = bgVolume / 100;

        const startMusic = () => {
            audio.play().catch((error) => console.error("Autoplay failed:", error));
        };

        document.addEventListener("click", startMusic, { once: true });

        return () => {
            document.removeEventListener("click", startMusic);
            audio.pause();
            audio.currentTime = 0;
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = bgVolume / 100;
        }
        localStorage.setItem("bgVolume", bgVolume);
    }, [bgVolume]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    const handleBack = () => {
        navigate("/play");
    };

    return (
        <PixelBox>
            <TableTitle>Game Results</TableTitle>

            <StyledTableContainer component={Paper}>
                <StyledTable aria-label="game results table">
                    <StyledTableHead>
                        <TableRow>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell align="right">Difficulty</StyledTableCell>
                            <StyledTableCell align="right">Failed Attempts</StyledTableCell>
                            <StyledTableCell align="right">Completed</StyledTableCell>
                            <StyledTableCell align="right">Time (seconds)</StyledTableCell>
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        {loading ? (
                            <StyledTableRow>
                                <StyledTableCell colSpan={5} align="center">Loading...</StyledTableCell>
                            </StyledTableRow>
                        ) : gameResults.length === 0 ? (
                            <StyledTableRow>
                                <StyledTableCell colSpan={5} align="center" sx={{ padding: "30px", fontSize: "18px", fontFamily: '"Press Start 2P", cursive' }}>
                                    You need to play more often!!
                                </StyledTableCell>
                            </StyledTableRow>
                        ) : (
                            gameResults.map((result, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                        {formatDate(result.gameDate)}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{result.difficulty}</StyledTableCell>
                                    <StyledTableCell align="right">{result.failed}</StyledTableCell>
                                    <StyledTableCell align="right">{result.completed ? "Yes" : "No"}</StyledTableCell>
                                    <StyledTableCell align="right">{result.timeTaken}</StyledTableCell>
                                </StyledTableRow>
                            ))
                        )}
                    </TableBody>
                </StyledTable>
            </StyledTableContainer>

            <ButtonContainer>
                <PixelButton onClick={handleBack}>Back to Menu</PixelButton>
            </ButtonContainer>
        </PixelBox>
    );
};

export default Results;
