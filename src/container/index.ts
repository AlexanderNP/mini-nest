import type { ConstructorWithInject, ProviderDefinition } from "../types";

export class Container {
  private providers = new Map<ConstructorWithInject, ProviderDefinition>();

  register(...providers: ConstructorWithInject[]) {
    for (const provider of providers) {
      if (this.providers.has(provider)) continue;

      this.providers.set(provider, { instance: undefined });
    }
  }

  resolve(provider: ConstructorWithInject) {
    if (!this.providers.has(provider)) throw Error(`Provider ${provider.name} is not registered`)
      
      
    const existProvider = this.providers.get(provider)!;
    
    if (existProvider.instance) return existProvider.instance;

    const dependencies = this.getDependencies(provider);

    return existProvider.instance = new provider(...dependencies);
  }

  private getDependencies(provider: ConstructorWithInject): object[] {
    return (provider.inject ?? []).map(dependency => this.resolve(dependency));
  }
}