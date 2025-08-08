# 📋 Guidelines de Développement - Gastronomia

## 🎯 Principes Fondamentaux

### TDD (Test-Driven Development)
**"Red, Green, Refactor"**

1. **Red** : Écrire un test qui échoue
2. **Green** : Écrire le code minimal pour faire passer le test
3. **Refactor** : Améliorer le code sans casser les tests

#### Règles TDD
- ✅ Toujours commencer par un test
- ✅ Un seul concept par test
- ✅ Tests expressifs et lisibles
- ✅ Coverage minimum de 80%
- ✅ Tests rapides et indépendants

#### Exemple TDD
```typescript
// 1. Test d'abord
describe('Recipe', () => {
  it('should create a recipe with required fields', () => {
    const recipe = new Recipe({
      title: 'Pasta Carbonara',
      ingredients: ['pasta', 'eggs', 'bacon'],
      instructions: 'Cook pasta...'
    });
    
    expect(recipe.title).toBe('Pasta Carbonara');
    expect(recipe.ingredients).toHaveLength(3);
  });
});

// 2. Implémentation minimale
// 3. Refactoring
```

### SOLID Principles

#### S - Single Responsibility Principle
Chaque classe/composant a une seule responsabilité.

```typescript
// ❌ Mauvais
class RecipeManager {
  saveRecipe() { /* ... */ }
  validateRecipe() { /* ... */ }
  sendEmail() { /* ... */ }  // Responsabilité différente
}

// ✅ Bon
class RecipeRepository {
  saveRecipe() { /* ... */ }
}

class RecipeValidator {
  validateRecipe() { /* ... */ }
}

class EmailService {
  sendEmail() { /* ... */ }
}
```

#### O - Open/Closed Principle
Ouvert à l'extension, fermé à la modification.

```typescript
// ✅ Bon - Extensible
interface RecipeFormatter {
  format(recipe: Recipe): string;
}

class MarkdownFormatter implements RecipeFormatter {
  format(recipe: Recipe): string {
    return `# ${recipe.title}\n\n${recipe.instructions}`;
  }
}

class HTMLFormatter implements RecipeFormatter {
  format(recipe: Recipe): string {
    return `<h1>${recipe.title}</h1><p>${recipe.instructions}</p>`;
  }
}
```

#### L - Liskov Substitution Principle
Les sous-classes doivent être substituables à leurs classes de base.

```typescript
// ✅ Bon
interface RecipeStorage {
  save(recipe: Recipe): Promise<void>;
  find(id: string): Promise<Recipe | null>;
}

class DatabaseStorage implements RecipeStorage {
  async save(recipe: Recipe): Promise<void> { /* ... */ }
  async find(id: string): Promise<Recipe | null> { /* ... */ }
}

class FileStorage implements RecipeStorage {
  async save(recipe: Recipe): Promise<void> { /* ... */ }
  async find(id: string): Promise<Recipe | null> { /* ... */ }
}
```

#### I - Interface Segregation Principle
Interfaces spécifiques plutôt qu'interfaces générales.

```typescript
// ❌ Mauvais
interface RecipeOperations {
  create(): void;
  read(): void;
  update(): void;
  delete(): void;
  share(): void;
  rate(): void;
}

// ✅ Bon
interface RecipeCRUD {
  create(): void;
  read(): void;
  update(): void;
  delete(): void;
}

interface RecipeSocial {
  share(): void;
  rate(): void;
}
```

#### D - Dependency Inversion Principle
Dépendre d'abstractions, pas de concretions.

```typescript
// ✅ Bon
class RecipeService {
  constructor(
    private storage: RecipeStorage,
    private validator: RecipeValidator
  ) {}
  
  async createRecipe(recipe: Recipe): Promise<void> {
    this.validator.validate(recipe);
    await this.storage.save(recipe);
  }
}
```

### DRY (Don't Repeat Yourself)

#### Composants Réutilisables
```typescript
// ✅ Bon - Composant générique
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ variant, size, children, onClick }) => {
  const baseClasses = 'px-4 py-2 rounded font-medium transition-colors';
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-500 hover:bg-red-600 text-white'
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

#### Hooks Personnalisés
```typescript
// ✅ Bon - Hook réutilisable
export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getRecipes();
      setRecipes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { recipes, loading, error, fetchRecipes };
};
```

#### Utilitaires
```typescript
// ✅ Bon - Fonctions utilitaires
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 
    ? `${hours}h ${remainingMinutes}min`
    : `${hours}h`;
};

export const validateRecipe = (recipe: Partial<Recipe>): ValidationResult => {
  const errors: string[] = [];
  
  if (!recipe.title?.trim()) {
    errors.push('Le titre est requis');
  }
  
  if (!recipe.ingredients?.length) {
    errors.push('Au moins un ingrédient est requis');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
```

## 🏗️ Architecture

### Clean Architecture
```
src/
├── domain/           # Entités et règles métier
├── application/      # Cas d'usage
├── infrastructure/   # Implémentations techniques
└── presentation/     # Interface utilisateur
```

### Structure des Composants
```typescript
// ✅ Bon - Structure claire
interface ComponentProps {
  // Props typées
}

interface ComponentState {
  // État local si nécessaire
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Hooks en haut
  const [state, setState] = useState<ComponentState>({});
  
  // Handlers
  const handleClick = useCallback(() => {
    // Logique
  }, []);
  
  // Effets
  useEffect(() => {
    // Side effects
  }, []);
  
  // Rendu
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

// Tests
describe('Component', () => {
  it('should render correctly', () => {
    // Test
  });
});
```

## 🧪 Tests

### Structure des Tests
```typescript
describe('RecipeService', () => {
  let service: RecipeService;
  let mockStorage: jest.Mocked<RecipeStorage>;
  
  beforeEach(() => {
    mockStorage = createMockStorage();
    service = new RecipeService(mockStorage);
  });
  
  describe('createRecipe', () => {
    it('should save valid recipe', async () => {
      // Arrange
      const recipe = createValidRecipe();
      
      // Act
      await service.createRecipe(recipe);
      
      // Assert
      expect(mockStorage.save).toHaveBeenCalledWith(recipe);
    });
    
    it('should throw error for invalid recipe', async () => {
      // Arrange
      const invalidRecipe = createInvalidRecipe();
      
      // Act & Assert
      await expect(service.createRecipe(invalidRecipe))
        .rejects.toThrow('Recipe invalide');
    });
  });
});
```

### Règles de Test
- ✅ Un test par comportement
- ✅ Nommage descriptif (Given/When/Then)
- ✅ Tests indépendants
- ✅ Mocks pour les dépendances externes
- ✅ Assertions claires et spécifiques

## 📝 Standards de Code

### TypeScript
- ✅ Types stricts partout
- ✅ Interfaces pour les contrats
- ✅ Pas de `any`
- ✅ Utilisation des utilitaires TypeScript

### React
- ✅ Composants fonctionnels avec hooks
- ✅ Props typées
- ✅ Pas de props drilling excessif
- ✅ Utilisation de Context si nécessaire

### Performance
- ✅ Memoization appropriée
- ✅ Lazy loading des composants
- ✅ Optimisation des re-renders
- ✅ Code splitting

## 🔍 Code Review Checklist

### Fonctionnalité
- [ ] Le code fait ce qu'il doit faire
- [ ] Gestion d'erreurs appropriée
- [ ] Validation des entrées
- [ ] Tests couvrent les cas d'usage

### Qualité
- [ ] Respect des principes SOLID
- [ ] Pas de duplication (DRY)
- [ ] Code lisible et maintenable
- [ ] Documentation si nécessaire

### Performance
- [ ] Pas de fuites mémoire
- [ ] Optimisations appropriées
- [ ] Temps de réponse acceptable

### Sécurité
- [ ] Validation côté client ET serveur
- [ ] Pas d'injection possible
- [ ] Gestion sécurisée des données sensibles

---

*Ces guidelines doivent être suivies pour maintenir la qualité et la maintenabilité du code.*
