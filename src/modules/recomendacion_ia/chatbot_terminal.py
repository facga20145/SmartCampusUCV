import requests
import sys

class ChatbotTerminal:
    def __init__(self):
        self.backend_url = "http://localhost:4000"  # URL de tu backend NestJS
        self.ia_url = "http://localhost:8000/recomendar"  # URL del microservicio Python
        self.usuario_id = 1  # Puedes cambiarlo según el usuario de prueba
        self.recomendaciones = []

    def iniciar(self):
        print("¡Hola! Soy el asistente de SmartCampus")
        print("Te ayudaré a escoger o recomendar actividades.")
        print("Escribe 'salir' para terminar la conversación")
        print("-" * 50)
        while True:
            try:
                mensaje = input("\nTú: ").strip()
                if mensaje.lower() in ['salir', 'exit', 'quit', 'adiós']:
                    print("\n¡Hasta luego! Que tengas un excelente día.")
                    break
                if not mensaje:
                    continue
                if any(palabra in mensaje.lower() for palabra in ['hola', 'buenas', 'saludos']):
                    self.preguntar_preferencias()
                elif hasattr(self, 'recomendaciones') and self.recomendaciones and mensaje.isdigit():
                    self.mostrar_detalle_recomendacion(int(mensaje))
                else:
                    print("\nBot: Salúdame para iniciar o escribe el número de la recomendación que te interesa.")
            except KeyboardInterrupt:
                print("\n\n¡Hasta luego! Que tengas un excelente día.")
                break
            except Exception as e:
                print(f"\nError: {str(e)}")

    def preguntar_preferencias(self):
        print("\nBot: ¿Qué tipo de actividades te gustan? (deportiva, artistica, voluntariado, canto)")
        preferencias_input = input("Tú (preferencias, separadas por coma): ").strip()
        if not preferencias_input:
            print("\nBot: No especificaste preferencias. Te mostraré todas las actividades disponibles.")
            self.mostrar_actividades()
            return
        categorias_preferidas = [cat.strip().lower() for cat in preferencias_input.split(',')]
        self.obtener_recomendaciones(categorias_preferidas)

    def obtener_recomendaciones(self, categorias_preferidas):
        try:
            # Obtener actividades reales de la BD
            response = requests.get(f"{self.backend_url}/actividades")
            if response.status_code != 200:
                print("\nBot: No pude obtener la lista de actividades. Intenta más tarde.")
                return
            actividades = response.json()
            if not actividades:
                print("\nBot: No hay actividades disponibles en este momento.")
                return
            # Preparar preferencias para la IA
            preferencias_para_ia = [{"categoria": cat} for cat in categorias_preferidas]
            actividades_para_ia = [
                {
                    "id": act["id"],
                    "categoria": act["categoria"],
                    "titulo": act["titulo"],
                    "descripcion": act.get("descripcion", "")
                }
                for act in actividades
            ]
            # Llamar a la IA
            ia_response = requests.post(self.ia_url, json={
                "actividades": actividades_para_ia,
                "preferencias": preferencias_para_ia
            })
            if ia_response.status_code != 200:
                print("\nBot: No pude obtener recomendaciones de la IA. Intenta más tarde.")
                return
            recomendaciones = ia_response.json().get("recomendaciones", [])
            if not recomendaciones:
                print("\nBot: No encontré actividades que coincidan con tus preferencias. ¿Te gustaría explorar otras opciones?")
                return
            self.recomendaciones = recomendaciones
            print("\nBot: Basándome en tus preferencias, te recomiendo estas actividades:")
            for i, rec in enumerate(recomendaciones, 1):
                print(f"{i}. {rec['titulo']} ({rec['categoria']})")
            print("\nEscribe el número de la actividad recomendada que te interesa para ver más detalles.")
        except Exception as e:
            print(f"\nBot: Error al obtener recomendaciones: {str(e)}")

    def mostrar_actividades(self):
        try:
            response = requests.get(f"{self.backend_url}/actividades")
            if response.status_code != 200:
                print("\nBot: No pude obtener la lista de actividades. Intenta más tarde.")
                return
            actividades = response.json()
            if not actividades:
                print("\nBot: No hay actividades disponibles en este momento.")
                return
            print("\nBot: Estas son las actividades disponibles:")
            for i, act in enumerate(actividades, 1):
                print(f"{i}. {act['titulo']} ({act['categoria']})")
            print("\nEscribe el número de la actividad que te interesa para ver más detalles.")
            self.recomendaciones = actividades
        except Exception as e:
            print(f"\nBot: Error al obtener actividades: {str(e)}")

    def mostrar_detalle_recomendacion(self, seleccion):
        try:
            recomendaciones = getattr(self, 'recomendaciones', None)
            if not recomendaciones or seleccion < 1 or seleccion > len(recomendaciones):
                print("\nBot: Selección inválida. Por favor, saluda primero para ver las recomendaciones.")
                return
            actividad = recomendaciones[seleccion - 1]
            print(f"\nBot: Detalles de la actividad:")
            print(f"Título: {actividad['titulo']}")
            print(f"Categoría: {actividad['categoria']}")
            print(f"Descripción: {actividad.get('descripcion', 'Sin descripción')}")
            if 'fecha' in actividad:
                print(f"Fecha: {actividad.get('fecha', 'Sin fecha')}")
            if 'lugar' in actividad:
                print(f"Lugar: {actividad.get('lugar', 'Sin lugar')}")
            # Opciones claras
            print("\nOpciones:")
            print("  1) Inscribirme en esta actividad")
            print("  2) Ver otras recomendaciones")
            print("  3) Salir")
            opcion = input("Elige 1, 2 o 3: ").strip()
            if opcion == '1':
                self.inscribir_en_actividad(actividad.get('id'))
            elif opcion == '2':
                # Volver a pedir preferencias para refrescar recomendaciones
                self.preguntar_preferencias()
            elif opcion.lower() in ['3', 'salir']:
                print("\n¡Hasta luego! Que tengas un excelente día.")
                sys.exit(0)
            else:
                print("\nBot: Opción no válida.")
        except Exception as e:
            print(f"\nBot: Error al mostrar detalles: {str(e)}")

    def inscribir_en_actividad(self, actividad_id):
        if not actividad_id:
            print("\nBot: No pude determinar el id de la actividad para inscribirte.")
            return
        try:
            payload = {"usuarioId": self.usuario_id, "actividadId": actividad_id}
            resp = requests.post(f"{self.backend_url}/inscripciones", json=payload)
            if resp.status_code in (200, 201):
                print("\nBot: ¡Inscripción registrada! Quedó en estado 'pendiente'.")
                return
            # Manejo de errores amigable
            msg = None
            try:
                data = resp.json()
                msg = data.get('message') if isinstance(data, dict) else None
            except Exception:
                msg = None
            if resp.status_code == 400 and msg:
                if 'inscripción activa' in msg.lower() or 'inscrito' in msg.lower():
                    print("\nBot: Ya tienes una inscripción activa. Debes finalizarla antes de inscribirte en otra actividad.")
                    return
            print(f"\nBot: No pude inscribirte. Código: {resp.status_code}. Respuesta: {resp.text}")
        except Exception as e:
            print(f"\nBot: Error al inscribirte: {str(e)}")

if __name__ == "__main__":
    chatbot = ChatbotTerminal()
    chatbot.iniciar()
