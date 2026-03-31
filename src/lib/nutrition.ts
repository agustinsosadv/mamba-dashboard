import type { DayPlan, DayType } from '@/types/nutrition'

const PLANS: Record<DayType, DayPlan> = {
  lunes_miercoles: {
    dayType: 'lunes_miercoles',
    label: 'Lunes / Miércoles',
    subtitle: 'Solo gym — día de menor demanda',
    targets: {
      kcal: 2300,
      proteinMin: 160, proteinMax: 165,
      carbsMin: 190, carbsMax: 210,
      fatsMin: 65, fatsMax: 65,
    },
    meals: [
      {
        name: 'Pre Gym',
        time: '07:45',
        emoji: '🍌',
        foods: ['1 pera', '1 scoop proteína whey'],
        macros: { protein: 25, carbs: 25, fats: 3, kcal: 230 },
      },
      {
        name: 'Desayuno Post Gym',
        time: '10:00',
        emoji: '🥣',
        foods: ['3 huevos + 2 claras', '50g avena cocida', 'Frutillas o arándanos'],
        macros: { protein: 40, carbs: 50, fats: 20, kcal: 540 },
      },
      {
        name: 'Almuerzo',
        time: '13:00',
        emoji: '🍽',
        foods: ['200g pollo', '200g papa', 'Ensalada variada', '1 cdta aceite oliva'],
        macros: { protein: 45, carbs: 45, fats: 18, kcal: 526 },
      },
      {
        name: 'Merienda',
        time: '17:00',
        emoji: '🥜',
        foods: ['Yogur griego', '15g nueces', '1 durazno'],
        macros: { protein: 20, carbs: 20, fats: 10, kcal: 250 },
      },
      {
        name: 'Cena',
        time: '20:30',
        emoji: '🍽',
        foods: ['200g pescado (merluza o salmón)', 'Verduras salteadas', '100g arroz o quinoa'],
        macros: { protein: 35, carbs: 40, fats: 15, kcal: 435 },
      },
    ],
  },

  martes_jueves: {
    dayType: 'martes_jueves',
    label: 'Martes / Jueves',
    subtitle: 'Gym + Rugby — doble turno',
    targets: {
      kcal: 2600,
      proteinMin: 165, proteinMax: 170,
      carbsMin: 245, carbsMax: 260,
      fatsMin: 60, fatsMax: 65,
    },
    meals: [
      {
        name: 'Desayuno',
        time: '08:30',
        emoji: '🥣',
        foods: ['3 huevos + 2 claras', '1 tostada integral', '1 kiwi', '1 naranja', 'Café'],
        macros: { protein: 40, carbs: 45, fats: 20, kcal: 520 },
      },
      {
        name: 'Almuerzo',
        time: '13:00',
        emoji: '🍽',
        foods: ['200g colita de cuadril o nalga', '250g batata asada', 'Ensalada (rúcula, tomate, zanahoria)', '1 cdta aceite oliva'],
        macros: { protein: 45, carbs: 60, fats: 20, kcal: 596 },
      },
      {
        name: 'Pre Gym',
        time: '17:00',
        emoji: '🍎',
        foods: ['Yogur natural o griego descremado', '1 manzana', '1 cdta miel', '1 scoop whey'],
        macros: { protein: 30, carbs: 55, fats: 5, kcal: 385 },
      },
      {
        name: 'Entre Gym y Rugby',
        time: '19:45',
        emoji: '⚡',
        foods: ['2 dátiles + 1 mandarina', 'o 1 barrita simple de cereal'],
        macros: { protein: 2, carbs: 28, fats: 1, kcal: 128 },
      },
      {
        name: 'Cena Post Rugby',
        time: '22:15',
        emoji: '🍽',
        foods: ['220g pechuga o bife magro', '1 taza arroz blanco', 'Brócoli o zucchini salteado'],
        macros: { protein: 45, carbs: 60, fats: 10, kcal: 506 },
      },
    ],
  },

  sabado_partido: {
    dayType: 'sabado_partido',
    label: 'Sábado',
    subtitle: 'Día de partido — carbos arriba',
    targets: {
      kcal: 2600,
      proteinMin: 160, proteinMax: 160,
      carbsMin: 250, carbsMax: 280,
      fatsMin: 60, fatsMax: 60,
    },
    meals: [
      {
        name: 'Desayuno',
        time: '08:00',
        emoji: '🥣',
        foods: ['2 tostadas blancas', '1 cdta miel', '1 banana', '1 yogur', 'Café'],
        macros: { protein: 20, carbs: 80, fats: 5, kcal: 445 },
      },
      {
        name: 'Pre Partido (opcional)',
        time: '10:45',
        emoji: '⏳',
        foods: ['1 mandarina', 'o 1 cdta miel'],
        macros: { protein: 0, carbs: 15, fats: 0, kcal: 60 },
      },
      {
        name: 'Post Partido',
        time: '13:30',
        emoji: '🍽',
        foods: ['250g carne', '1 taza y media arroz', 'Algo salado para recuperar sodio'],
        macros: { protein: 50, carbs: 90, fats: 18, kcal: 726 },
      },
      {
        name: 'Merienda',
        time: '17:00',
        emoji: '🥛',
        foods: ['Yogur griego', '1 fruta', '30g granola'],
        macros: { protein: 20, carbs: 45, fats: 8, kcal: 332 },
      },
      {
        name: 'Cena',
        time: '20:30',
        emoji: '🍽',
        foods: ['200g proteína magra', 'Verduras variadas', '150g papa o boniato'],
        macros: { protein: 40, carbs: 40, fats: 15, kcal: 455 },
      },
    ],
  },

  domingo_descanso: {
    dayType: 'domingo_descanso',
    label: 'Domingo',
    subtitle: 'Descanso activo — bajamos carbos',
    targets: {
      kcal: 2100,
      proteinMin: 160, proteinMax: 160,
      carbsMin: 140, carbsMax: 160,
      fatsMin: 65, fatsMax: 65,
    },
    meals: [
      {
        name: 'Desayuno',
        time: '09:00',
        emoji: '🥣',
        foods: ['3 huevos + 2 claras', '1 tostada integral', 'Café o té'],
        macros: { protein: 38, carbs: 20, fats: 20, kcal: 408 },
      },
      {
        name: 'Almuerzo',
        time: '13:00',
        emoji: '🍽',
        foods: ['250g carne magra', 'Ensalada variada (lechuga, tomate, pepino)', '1 cdta aceite oliva'],
        macros: { protein: 50, carbs: 10, fats: 20, kcal: 420 },
      },
      {
        name: 'Merienda',
        time: '17:00',
        emoji: '🍎',
        foods: ['Yogur griego', '1 fruta de estación'],
        macros: { protein: 20, carbs: 25, fats: 5, kcal: 225 },
      },
      {
        name: 'Cena',
        time: '20:30',
        emoji: '🍽',
        foods: ['200g proteína (pescado, pollo o carne)', 'Abundantes verduras salteadas', '100g arroz o quinoa'],
        macros: { protein: 40, carbs: 40, fats: 15, kcal: 455 },
      },
    ],
  },
}

export function getDayPlan(dayType: DayType): DayPlan {
  return PLANS[dayType]
}

export function getAllPlans(): DayPlan[] {
  return Object.values(PLANS)
}
