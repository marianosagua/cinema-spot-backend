export interface Actor {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  nationality: string;
}

export interface CreateActorDto {
  first_name: string;
  last_name: string;
  age: number;
  nationality: string;
}

export interface UpdateActorDto {
  first_name?: string;
  last_name?: string;
  age?: number;
  nationality?: string;
} 