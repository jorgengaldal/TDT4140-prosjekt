"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  ThemeProvider,
} from "@mui/material";
import Poster from "@/components/General/Poster";
import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: "#2D3250"
    }
  },
});

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const FilterPage: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [filter, setFilter] = useState({
    genre: [],
    rating: [],
    yearStart: "",
    yearEnd: "",
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/movies/movies/")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movie posters: ", error));
  }, []);

  const filteredMovies = movies.filter((movie) => {
    console.log(movie.released);
    const year = new Date(movie.released).getFullYear();
    const startYearMatch = filter.yearStart
      ? year >= parseInt(filter.yearStart)
      : true;
    const endYearMatch = filter.yearEnd
      ? year <= parseInt(filter.yearEnd)
      : true;
    return (
      (filter.genre.length === 0 ||
        filter.genre.some((g) => movie.genres.includes(g))) &&
      (filter.rating.length === 0 ||
        filter.rating.some(
          (r) => movie.rated.toLowerCase() === r.toLowerCase()
        )) &&
      startYearMatch &&
      endYearMatch
    );
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilter((prev) => ({
      ...prev,
      [name]: typeof value === "string" ? value.split(",") : value,
    }));
  };

  return (
    <Container className="min-h-screen">
      <ThemeProvider theme={defaultTheme}>
        <div
          style={{
            marginBottom: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FormControl fullWidth margin="normal" sx={{ marginRight: 10 }}>
            <InputLabel id="genre-filter-label">Genre</InputLabel>
            <Select
              labelId="genre-filter-label"
              id="genre-filter"
              multiple
              value={filter.genre}
              onChange={handleChange}
              input={<OutlinedInput label="Genre" />}
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
              name="genre"
            >
              {[
                "Comedy",
                "Action",
                "Adventure",
                "Horror",
                "Drama",
                "Thriller",
                "Sci-Fi",
              ].map((genre, index) => (
                <MenuItem value={genre} key={index}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" sx={{ marginRight: 10 }}>
            <InputLabel id="rating-filter-label">Rating</InputLabel>
            <Select
              labelId="rating-filter-label"
              id="rating-filter"
              multiple
              value={filter.rating}
              onChange={handleChange}
              input={<OutlinedInput label="Rating" />}
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
              name="rating"
            >
              <MenuItem value="G">G</MenuItem>
              <MenuItem value="PG">PG</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="yearStart"
            label="Year Start"
            type="number"
            value={filter.yearStart}
            onChange={handleChange}
            style={{ marginRight: 10, minWidth: 150 }}
          />
          <TextField
            name="yearEnd"
            label="Year End"
            type="number"
            value={filter.yearEnd}
            onChange={handleChange}
            style={{ minWidth: 150 }}
          />
        </div>
      </ThemeProvider>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginTop: "5px",
          color: "#fff",
          textShadow: "2px 2px 4px #000000",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Movies
      </h1>
      <Grid container spacing={3} justifyContent="center">
        {filteredMovies.map((movie, index) => (
          <Grid item xs={10} sm={5} md={4} lg={3} key={index}>
            <Poster movie={movie} index={index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FilterPage;