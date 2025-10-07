from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

class Actividad(BaseModel):
    id: int
    categoria: str
    titulo: Optional[str] = None
    descripcion: Optional[str] = None

class Preferencia(BaseModel):
    categoria: str
    nivel: Optional[int] = None

class RecomendacionRequest(BaseModel):
    actividades: List[Actividad]
    preferencias: List[Preferencia]

@app.post("/recomendar")
def recomendar(data: RecomendacionRequest):
    categorias_preferidas = [p.categoria for p in data.preferencias]
    recomendadas = [a for a in data.actividades if a.categoria in categorias_preferidas]
    return {"recomendaciones": recomendadas}

# Para correr: uvicorn ia_recomendador:app --reload
